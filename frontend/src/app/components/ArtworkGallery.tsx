import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";
import type { ApiList, Artwork } from "../../lib/types";
import { parsePrice, formatPrice, resolveImage } from "../../lib/formatters";

// Backend'den gelen favoriler ham olarak gelir; sadece artwork_id'leri tutacağız
type FavoriteRecord = { artwork_id?: string; favorite_id?: string } & Record<string, unknown>;

export default function ArtworkGallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Backend'den gelen kategorileri dinamik çıkaracağız + sabit bir "all"
  const categories = ["all", ...Array.from(new Set(artworks.map((a) => a.category).filter(Boolean) as string[]))];

  // Sayfa açılışında: eserleri ve (giriş varsa) favorileri yükle
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const loggedIn = auth.isLoggedIn();
      const user = auth.getUser();
      setIsLoggedIn(loggedIn);
      setUserRole(user?.role ?? null);

      try {
        const res = await api.get<ApiList<Artwork>>("/artworks", { skipAuth: true });
        if (cancelled) return;
        setArtworks(res.data);
      } catch (err) {
        console.error("Eserler yüklenemedi:", err);
        toast.error("Eserler yüklenemedi");
      } finally {
        if (!cancelled) setLoading(false);
      }

      // Favorileri çek (sadece giriş yapılmışsa)
      if (loggedIn) {
        try {
          const favRes = await api.get<ApiList<FavoriteRecord>>("/favorites");
          if (cancelled) return;
          const ids = favRes.data
            .map((f) => f.artwork_id)
            .filter((id): id is string => typeof id === "string");
          setFavoriteIds(ids);
        } catch (err) {
          // Sessiz başarısızlık: favoriler çekilemezse eserler yine görüntülenmeli
          console.warn("Favoriler yüklenemedi:", err);
        }
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Filtreleme + sıralama
  useEffect(() => {
    let filtered = [...artworks];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(q) ||
          (artwork.artist_name?.toLowerCase().includes(q) ?? false)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((artwork) => artwork.category === selectedCategory);
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((a) => {
        const p = parsePrice(a.price);
        if (priceRange === "0-10000") return p <= 10000;
        if (priceRange === "10000-15000") return p > 10000 && p <= 15000;
        if (priceRange === "15000-20000") return p > 15000 && p <= 20000;
        if (priceRange === "20000+") return p > 20000;
        return true;
      });
    }

    if (sortBy === "price-low") {
      filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => {
        const ad = a.created_at ? new Date(a.created_at).getTime() : 0;
        const bd = b.created_at ? new Date(b.created_at).getTime() : 0;
        return bd - ad;
      });
    }

    setFilteredArtworks(filtered);
  }, [searchTerm, selectedCategory, priceRange, sortBy, artworks]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("newest");
    setSearchTerm("");
  };

  const toggleFavorite = async (artworkId: string) => {
    if (!isLoggedIn) {
      toast.error("Favorilere eklemek için giriş yapmalısınız!");
      return;
    }

    const isFav = favoriteIds.includes(artworkId);
    // Optimistic update: önce UI'ı güncelle, sonra API çağrısı yap
    const previous = favoriteIds;
    const next = isFav ? favoriteIds.filter((id) => id !== artworkId) : [...favoriteIds, artworkId];
    setFavoriteIds(next);
    window.dispatchEvent(new Event("favoritesUpdated"));

    try {
      if (isFav) {
        await api.delete(`/favorites/${artworkId}`);
        toast.info("Favorilerden çıkarıldı");
      } else {
        await api.post("/favorites", { artworkId });
        api.patch(`/artworks/${artworkId}/like`).catch(() => {});
        toast.success("Favorilere eklendi!");
      }
    } catch (err) {
      // Hata olursa eski hale döndür
      setFavoriteIds(previous);
      window.dispatchEvent(new Event("favoritesUpdated"));
      const message = err instanceof ApiError ? err.message : "İşlem başarısız";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl mb-4 font-light">Sanat Eserleri</h1>
          <p className="text-muted-foreground text-lg font-light">
            {loading ? "Yükleniyor..." : `${filteredArtworks.length} eser bulundu`}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Eser veya sanatçı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-all flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtreler</span>
            </button>
          </div>

          {showFilters && (
            <div className="bg-muted/30 backdrop-blur-xl border border-border/50 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-light">Filtreler</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-3 font-light">Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-3 rounded-full transition-all ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-background hover:bg-accent"
                        }`}
                      >
                        {category === "all" ? "Tümü" : category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-light">Fiyat Aralığı</label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="all">Tümü</option>
                      <option value="0-10000">₺0 - ₺10,000</option>
                      <option value="10000-15000">₺10,000 - ₺15,000</option>
                      <option value="15000-20000">₺15,000 - ₺20,000</option>
                      <option value="20000+">₺20,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-light">Sıralama</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="newest">En Yeni</option>
                      <option value="price-low">Fiyat (Düşük)</option>
                      <option value="price-high">Fiyat (Yüksek)</option>
                      <option value="rating">En Çok Beğenilen</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-all"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-muted rounded-2xl mb-4" />
                <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-5 bg-muted rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-muted-foreground mb-4 font-light">Eser bulunamadı</p>
            <p className="text-muted-foreground font-light">Lütfen farklı filtreler deneyin</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork) => (
              <div key={artwork.artwork_id} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <Link to={`/artworks/${artwork.artwork_id}`}>
                    <ImageWithFallback
                      src={resolveImage(artwork.image_url)}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                  {userRole !== "Admin" && (
                    <button
                      onClick={() => toggleFavorite(artwork.artwork_id)}
                      className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all hover:scale-110 ${
                        !isLoggedIn ? "opacity-60" : ""
                      }`}
                      title={!isLoggedIn ? "Favorilere eklemek için giriş yapın" : "Favorilere ekle"}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favoriteIds.includes(artwork.artwork_id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  )}
                  {artwork.category && (
                    <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm">
                      {artwork.category}
                    </div>
                  )}
                </div>
                <Link to={`/artworks/${artwork.artwork_id}`}>
                  <h3 className="text-xl mb-1 hover:text-primary transition-colors font-light">
                    {artwork.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 font-light">
                  {artwork.artist_name || "Bilinmeyen sanatçı"}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">{formatPrice(artwork.price)}</p>
                  {(artwork.like_count ?? 0) > 0 && (
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{artwork.like_count}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
