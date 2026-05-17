import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Heart, Star, Trash2 } from "lucide-react";
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

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteArtworks, setFavoriteArtworks] = useState<any[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
    const artworks = ARTWORKS_DATA.filter(artwork => storedFavorites.includes(artwork.id));
    setFavoriteArtworks(artworks);
  }, []);

  const removeFavorite = (artworkId: number) => {
    const newFavorites = favorites.filter(id => id !== artworkId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    window.dispatchEvent(new Event("favoritesUpdated"));
    const artworks = ARTWORKS_DATA.filter(artwork => newFavorites.includes(artwork.id));
    setFavoriteArtworks(artworks);
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-10 h-10 text-primary" />
            <h1 className="text-6xl font-light">Favorilerim</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">{favoriteArtworks.length} eser favorilerinizde</p>
        </div>

        {favoriteArtworks.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="text-3xl text-muted-foreground mb-4 font-light">Henüz favori eseriniz yok</p>
            <Link to="/artworks" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
              Eserleri Keşfedin
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteArtworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                  <Link to={`/artworks/${artwork.id}`}>
                    <ImageWithFallback src={artwork.image} alt={artwork.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                  <button onClick={() => removeFavorite(artwork.id)} className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all hover:scale-110">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm">{artwork.category}</div>
                </div>
                <Link to={`/artworks/${artwork.id}`}>
                  <h3 className="text-xl mb-1 hover:text-primary transition-colors font-light">{artwork.title}</h3>
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
