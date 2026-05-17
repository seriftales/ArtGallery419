import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Palette, TrendingUp, Eye, Heart, DollarSign, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ArtistDashboardProps {
  isLoggedIn: boolean;
}

export default function ArtistDashboard({ isLoggedIn }: ArtistDashboardProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats] = useState({
    totalArtworks: 12,
    totalSales: 45000,
    totalViews: 2340,
    totalFavorites: 156
  });
  const [showArtworkForm, setShowArtworkForm] = useState(false);
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);

  const [artworks] = useState([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      title: "Renklerin Dansı",
      price: 15000,
      status: "active",
      views: 342,
      favorites: 45,
      sales: 1
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1580687580441-96dbadf8f3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      title: "İç Dünya",
      price: 18000,
      status: "active",
      views: 289,
      favorites: 38,
      sales: 0
    }
  ]);

  const handleAddArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Yeni eser başarıyla eklendi!");
    setShowArtworkForm(false);
  };

  const handleAddWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Yeni atölye başarıyla oluşturuldu!");
    setShowWorkshopForm(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.role !== "artist") {
      navigate("/");
      return;
    }
    setUser(storedUser);
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-10 h-10 text-primary" />
            <h1 className="text-5xl md:text-6xl font-light">Sanatçı Paneli</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">Hoş geldiniz, {user.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Palette className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{stats.totalArtworks}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Toplam Eser</h3>
            <p className="text-sm opacity-75 mt-1">Galeride mevcut</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">₺{stats.totalSales.toLocaleString()}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Toplam Satış</h3>
            <p className="text-sm opacity-75 mt-1">Bu ay</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{stats.totalViews}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Görüntülenme</h3>
            <p className="text-sm opacity-75 mt-1">Son 30 gün</p>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{stats.totalFavorites}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Favori</h3>
            <p className="text-sm opacity-75 mt-1">Toplam beğeni</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => setShowArtworkForm(true)}
            className="px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Eser Ekle</span>
          </button>
          <button
            onClick={() => setShowWorkshopForm(true)}
            className="px-6 py-4 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Yeni Atölye Oluştur</span>
          </button>
        </div>

        {/* Artwork Form Modal */}
        {showArtworkForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl mb-6 font-light">Yeni Eser Ekle</h2>
              <form onSubmit={handleAddArtwork} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-light">Eser Adı</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-light">Kategori</label>
                  <select className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                    <option value="">Seçiniz</option>
                    <option value="Yağlı Boya">Yağlı Boya</option>
                    <option value="Akrilik">Akrilik</option>
                    <option value="Heykel">Heykel</option>
                    <option value="Karma Teknik">Karma Teknik</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-light">Fiyat (₺)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-light">Boyut</label>
                    <input
                      type="text"
                      placeholder="100x80 cm"
                      className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-light">Açıklama</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium"
                  >
                    Ekle
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowArtworkForm(false)}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-colors font-medium"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Workshop Form Modal */}
        {showWorkshopForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl mb-6 font-light">Yeni Atölye Oluştur</h2>
              <form onSubmit={handleAddWorkshop} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-light">Atölye Adı</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-light">Kategori</label>
                  <select className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                    <option value="">Seçiniz</option>
                    <option value="Resim">Resim</option>
                    <option value="Heykel">Heykel</option>
                    <option value="Çizim">Çizim</option>
                    <option value="Karma">Karma</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-light">Tarih</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-light">Saat</label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-light">Fiyat (₺)</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-light">Kontenjan</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-light">Açıklama</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors font-medium"
                  >
                    Oluştur
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWorkshopForm(false)}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-colors font-medium"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Artworks Table */}
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-light">Eserlerim</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>En çok görüntülenenler</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-4 px-4 font-light">Eser</th>
                  <th className="text-center py-4 px-4 font-light">Fiyat</th>
                  <th className="text-center py-4 px-4 font-light">Durum</th>
                  <th className="text-center py-4 px-4 font-light">Görüntülenme</th>
                  <th className="text-center py-4 px-4 font-light">Favori</th>
                  <th className="text-center py-4 px-4 font-light">Satış</th>
                  <th className="text-right py-4 px-4 font-light">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {artworks.map((artwork) => (
                  <tr key={artwork.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="font-light">{artwork.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">₺{artwork.price.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        artwork.status === "active"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-gray-500/10 text-gray-600"
                      }`}>
                        {artwork.status === "active" ? "Aktif" : "Pasif"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">{artwork.views}</td>
                    <td className="py-4 px-4 text-center">{artwork.favorites}</td>
                    <td className="py-4 px-4 text-center">
                      {artwork.sales > 0 ? (
                        <span className="text-green-600 font-medium">{artwork.sales}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
