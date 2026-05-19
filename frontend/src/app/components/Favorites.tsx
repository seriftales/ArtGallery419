import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";
import type { ApiList, Artwork } from "../../lib/types";
import { formatPrice, resolveImage } from "../../lib/formatters";

type FavoriteRecord = { artwork_id?: string } & Record<string, unknown>;

export default function Favorites() {
  const [favoriteArtworks, setFavoriteArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loggedIn = auth.isLoggedIn();
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        // İki isteği paralel: favoriler + tüm eserler
        const [favRes, artworksRes] = await Promise.all([
          api.get<ApiList<FavoriteRecord>>("/favorites"),
          api.get<ApiList<Artwork>>("/artworks", { skipAuth: true }),
        ]);

        if (cancelled) return;

        // Favori ID'leri topla
        const favIds = new Set(
          favRes.data
            .map((f) => f.artwork_id)
            .filter((id): id is string => typeof id === "string")
        );

        // Sadece favori olan eserleri filtrele
        const favArtworks = artworksRes.data.filter((a) => favIds.has(a.artwork_id));
        setFavoriteArtworks(favArtworks);
      } catch (err) {
        console.error("Favoriler yüklenemedi:", err);
        toast.error("Favoriler yüklenemedi");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const removeFavorite = async (artworkId: string) => {
    // Optimistic update: önce UI'dan kaldır
    const previous = favoriteArtworks;
    setFavoriteArtworks((prev) => prev.filter((a) => a.artwork_id !== artworkId));
    window.dispatchEvent(new Event("favoritesUpdated"));

    try {
      await api.delete(`/favorites/${artworkId}`);
      toast.info("Favorilerden çıkarıldı");
    } catch (err) {
      // Hata olursa eski hale döndür
      setFavoriteArtworks(previous);
      window.dispatchEvent(new Event("favoritesUpdated"));
      const message = err instanceof ApiError ? err.message : "İşlem başarısız";
      toast.error(message);
    }
  };

  // Giriş yapmamış kullanıcı için özel görünüm
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="text-3xl text-muted-foreground mb-4 font-light">Favorileri görmek için giriş yapın</p>
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-10 h-10 text-primary" />
            <h1 className="text-6xl font-light">Favorilerim</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">
            {loading ? "Yükleniyor..." : `${favoriteArtworks.length} eser favorilerinizde`}
          </p>
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
        ) : favoriteArtworks.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="text-3xl text-muted-foreground mb-4 font-light">Henüz favori eseriniz yok</p>
            <Link
              to="/artworks"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
            >
              Eserleri Keşfedin
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteArtworks.map((artwork) => (
              <div key={artwork.artwork_id} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <Link to={`/artworks/${artwork.artwork_id}`}>
                    <ImageWithFallback
                      src={resolveImage(artwork.image_url)}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </Link>
                  <button
                    onClick={() => removeFavorite(artwork.artwork_id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all hover:scale-110"
                    title="Favorilerden çıkar"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
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
