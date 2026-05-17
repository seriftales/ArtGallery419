import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Palette, Eye, Heart, DollarSign, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";
import type { ApiList, Artwork } from "../../lib/types";
import { formatPrice, resolveImage } from "../../lib/formatters";

interface ArtistDashboardProps {
  isLoggedIn: boolean;
}

export default function ArtistDashboard({ isLoggedIn }: ArtistDashboardProps) {
  const navigate = useNavigate();
  const user = auth.getUser();
  const [myArtworks, setMyArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) { navigate("/login"); return; }
    if (user?.role !== "Artist") { navigate("/"); return; }

    let cancelled = false;
    const load = async () => {
      try {
        const res = await api.get<ApiList<Artwork>>("/artworks", { skipAuth: true });
        if (cancelled) return;
        // Sanatçının kendi adına göre filtreleme
        const mine = res.data.filter((a) =>
          a.artist_name && user?.name && a.artist_name.toLowerCase().includes(user.name.toLowerCase())
        );
        setMyArtworks(mine);
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Eserler yüklenemedi";
        toast.error(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (!user) return null;

  const totalViews = myArtworks.reduce((sum, a) => sum + (a.view_count || 0), 0);
  const totalLikes = myArtworks.reduce((sum, a) => sum + (a.like_count || 0), 0);
  const totalValue = myArtworks.reduce((sum, a) => sum + parseFloat(a.price || "0"), 0);

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-10 h-10 text-primary" />
            <h1 className="text-5xl md:text-6xl font-light">Sanatçı Paneli</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">Hoş geldiniz, {user.name}</p>
        </div>

        {/* Stats (gerçek) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Palette className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{loading ? "..." : myArtworks.length}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Toplam Eser</h3>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-light">{loading ? "..." : formatPrice(totalValue)}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Portföy Değeri</h3>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{loading ? "..." : totalViews}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Görüntülenme</h3>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{loading ? "..." : totalLikes}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Beğeni</h3>
          </div>
        </div>

        {/* Bilgi notu */}
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-sm text-yellow-700">
          ℹ️ Yeni eser ekleme ve atölye oluşturma özellikleri şu anda yalnızca admin paneli üzerinden yapılmaktadır. Bu özellikler ileride sanatçı paneline taşınacaktır.
        </div>

        {/* Eserler */}
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <h2 className="text-3xl font-light">Eserlerim</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Toplam {myArtworks.length} eser</span>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => <div key={i} className="animate-pulse bg-muted rounded-2xl h-24" />)}
            </div>
          ) : myArtworks.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 font-light">
              Henüz eseriniz bulunmuyor. (Admin tarafından eklendiğinde burada görünecek.)
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4 font-light">Eser</th>
                    <th className="text-center py-4 px-4 font-light">Fiyat</th>
                    <th className="text-center py-4 px-4 font-light">Durum</th>
                    <th className="text-center py-4 px-4 font-light">Görüntülenme</th>
                    <th className="text-center py-4 px-4 font-light">Beğeni</th>
                  </tr>
                </thead>
                <tbody>
                  {myArtworks.map((a) => (
                    <tr key={a.artwork_id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img src={resolveImage(a.image_url)} alt={a.title} className="w-16 h-16 object-cover rounded-lg" />
                          <span className="font-light">{a.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">{formatPrice(a.price)}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          a.stock_status === "Available" ? "bg-green-500/10 text-green-600" :
                          a.stock_status === "Sold" ? "bg-red-500/10 text-red-600" :
                          "bg-yellow-500/10 text-yellow-600"
                        }`}>
                          {a.stock_status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">{a.view_count ?? 0}</td>
                      <td className="py-4 px-4 text-center">{a.like_count ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
