import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ARTWORKS_DATA = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Renklerin Dansı",
    artist: "Ayşe Demir",
    category: "Yağlı Boya",
    price: 15000,
    year: 2024,
    rating: 4.8,
    reviews: 24,
    description: "Canlı renkler ve dinamik fırça darbeleriyle yaratılmış modern bir eser."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Sessiz Anlar",
    artist: "Mehmet Yılmaz",
    category: "Akrilik",
    price: 12500,
    year: 2023,
    rating: 4.6,
    reviews: 18,
    description: "İç huzuru ve sessizliği temsil eden minimalist bir çalışma."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1580687580441-96dbadf8f3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "İç Dünya",
    artist: "Zeynep Kaya",
    category: "Karma Teknik",
    price: 18000,
    year: 2024,
    rating: 4.9,
    reviews: 32,
    description: "İnsan psikolojisini ve duygusal derinliği keşfeden bir eser."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1545830384-3a2061eb44ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Düşüncenin Formu",
    artist: "Can Öztürk",
    category: "Heykel",
    price: 22000,
    year: 2023,
    rating: 4.9,
    reviews: 31,
    description: "Modern heykel sanatının yenilikçi bir örneği."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Doğanın Ritmi",
    artist: "Elif Yıldız",
    category: "Yağlı Boya",
    price: 16500,
    year: 2024,
    rating: 4.7,
    reviews: 21,
    description: "Doğanın döngüsel yapısını ve enerjisini yansıtan dinamik bir kompozisyon."
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Zaman Akışı",
    artist: "Murat Demir",
    category: "Akrilik",
    price: 13500,
    year: 2025,
    rating: 4.8,
    reviews: 27,
    description: "Zamanın soyut bir temsili, geçmişten geleceğe akan bir anlatı."
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1536924940684-b2d9a91549e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Kentsel Doku",
    artist: "Hasan Yılmaz",
    category: "Karma Teknik",
    price: 19500,
    year: 2024,
    rating: 4.9,
    reviews: 35,
    description: "Modern şehir hayatının karmaşık dokusunu keşfeden çok katmanlı bir eser."
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Sonsuzluk",
    artist: "Can Öztürk",
    category: "Heykel",
    price: 25000,
    year: 2025,
    rating: 4.9,
    reviews: 29,
    description: "Sonsuzluk kavramını üç boyutta ele alan özgün bir heykel çalışması."
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Işığın İzinde",
    artist: "Ayşe Demir",
    category: "Yağlı Boya",
    price: 14000,
    year: 2023,
    rating: 4.7,
    reviews: 22,
    description: "Işık ve gölge oyunlarıyla yaratılan atmosferik bir manzara."
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1536924940684-8e4f898b4146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Denge",
    artist: "Zeynep Kaya",
    category: "Akrilik",
    price: 11500,
    year: 2025,
    rating: 4.6,
    reviews: 19,
    description: "Zıtlıkların uyumu ve dengenin görsel bir ifadesi."
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1518518873111-6ca469aa4560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Anıların İzi",
    artist: "Mehmet Yılmaz",
    category: "Karma Teknik",
    price: 17500,
    year: 2024,
    rating: 4.8,
    reviews: 26,
    description: "Geçmişin izlerini taşıyan, nostaljik bir atmosfere sahip eser."
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Metamorfoz",
    artist: "Elif Yıldız",
    category: "Heykel",
    price: 21000,
    year: 2025,
    rating: 4.9,
    reviews: 33,
    description: "Dönüşüm ve evrim temalarını işleyen çağdaş bir heykel."
  }
];

export default function ArtworkGallery() {
  const [artworks] = useState(ARTWORKS_DATA);
  const [filteredArtworks, setFilteredArtworks] = useState(ARTWORKS_DATA);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const categories = ["all", "Yağlı Boya", "Akrilik", "Heykel", "Karma Teknik"];

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    if (user) {
      const userData = JSON.parse(user);
      setUserRole(userData.role);
    }

    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    let filtered = [...artworks];

    if (searchTerm) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((artwork) => artwork.category === selectedCategory);
    }

    if (priceRange !== "all") {
      if (priceRange === "0-10000") {
        filtered = filtered.filter(a => a.price <= 10000);
      } else if (priceRange === "10000-15000") {
        filtered = filtered.filter(a => a.price > 10000 && a.price <= 15000);
      } else if (priceRange === "15000-20000") {
        filtered = filtered.filter(a => a.price > 15000 && a.price <= 20000);
      } else if (priceRange === "20000+") {
        filtered = filtered.filter(a => a.price > 20000);
      }
    }

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => b.year - a.year);
    }

    setFilteredArtworks(filtered);
  }, [searchTerm, selectedCategory, priceRange, sortBy, artworks]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSortBy("newest");
    setSearchTerm("");
  };

  const toggleFavorite = (artworkId: number) => {
    if (!isLoggedIn) {
      toast.error("Favorilere eklemek için giriş yapmalısınız!");
      return;
    }

    const newFavorites = favorites.includes(artworkId)
      ? favorites.filter((id) => id !== artworkId)
      : [...favorites, artworkId];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl mb-4 font-light">Sanat Eserleri</h1>
          <p className="text-muted-foreground text-lg font-light">{filteredArtworks.length} eser bulundu</p>
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
                      <option value="rating">En Yüksek Puan</option>
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

        {filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-muted-foreground mb-4 font-light">Eser bulunamadı</p>
            <p className="text-muted-foreground font-light">Lütfen farklı filtreler deneyin</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <Link to={`/artworks/${artwork.id}`}>
                    <ImageWithFallback
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                  {/* Favoriler: Admin hariç */}
                  {userRole !== 'admin' && (
                    <button
                      onClick={() => toggleFavorite(artwork.id)}
                      className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all hover:scale-110 ${
                        !isLoggedIn ? "opacity-60" : ""
                      }`}
                      title={!isLoggedIn ? "Favorilere eklemek için giriş yapın" : "Favorilere ekle"}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(artwork.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  )}
                  <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm">
                    {artwork.category}
                  </div>
                </div>
                <Link to={`/artworks/${artwork.id}`}>
                  <h3 className="text-xl mb-1 hover:text-primary transition-colors font-light">
                    {artwork.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 font-light">{artwork.artist}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">₺{artwork.price.toLocaleString('tr-TR')}</p>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{artwork.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
