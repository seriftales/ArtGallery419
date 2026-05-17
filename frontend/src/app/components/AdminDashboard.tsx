import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Shield, Users, Palette, DollarSign, TrendingUp, MessageSquare, Eye } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";
import type { ApiList, Artwork, ArtEvent } from "../../lib/types";
import { formatPrice } from "../../lib/formatters";

interface AdminDashboardProps {
  isLoggedIn: boolean;
}

interface DashboardSummary {
  totalUsers: number;
  totalSales: number;
  totalRevenue: number;
  activeEvents: number;
}

interface ArtworkStat {
  artwork_id: string;
  title: string;
  view_count: number;
  total_reviews: string;
  average_rating: string;
}

interface EventStat {
  event_id: string;
  title: string;
  capacity: number;
  view_count: number;
  total_reservations: string;
  occupancy_rate: string;
  average_rating: string;
}

export default function AdminDashboard({ isLoggedIn }: AdminDashboardProps) {
  const navigate = useNavigate();
  const user = auth.getUser();

  const [activeTab, setActiveTab] = useState<"overview" | "artworks" | "workshops">("overview");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [artworkStats, setArtworkStats] = useState<ArtworkStat[]>([]);
  const [eventStats, setEventStats] = useState<EventStat[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [events, setEvents] = useState<ArtEvent[]>([]);

  useEffect(() => {
    if (!isLoggedIn) { navigate("/login"); return; }
    if (user?.role !== "Admin") { navigate("/"); return; }

    let cancelled = false;
    const load = async () => {
      try {
        const [sum, aStats, eStats, aw, ev] = await Promise.all([
          api.get<{ success: boolean; data: DashboardSummary }>("/admin/summary"),
          api.get<{ success: boolean; data: ArtworkStat[] }>("/admin/stats/artworks"),
          api.get<{ success: boolean; data: EventStat[] }>("/admin/stats/events"),
          api.get<ApiList<Artwork>>("/artworks", { skipAuth: true }),
          api.get<ApiList<ArtEvent>>("/events", { skipAuth: true }),
        ]);
        if (cancelled) return;
        setSummary(sum.data);
        setArtworkStats(aStats.data || []);
        setEventStats(eStats.data || []);
        setArtworks(aw.data || []);
        setEvents(ev.data || []);
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Veriler yüklenemedi";
        toast.error(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleDeleteArtwork = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" eserini silmek istediğinizden emin misiniz?`)) return;
    try {
      await api.delete(`/artworks/${id}`);
      setArtworks((prev) => prev.filter((a) => a.artwork_id !== id));
      toast.success("Eser silindi");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Silinemedi";
      toast.error(message);
    }
  };

  if (!user) return null;

  // İstatistik haritalama
  const statByArtworkId = new Map(artworkStats.map((s) => [s.artwork_id, s]));
  const statByEventId = new Map(eventStats.map((s) => [s.event_id, s]));

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-5xl md:text-6xl font-light">Admin Paneli</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">Hoş geldiniz, {user.name}</p>
        </div>

        {/* Stats Cards (gerçek verilerle) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{loading ? "..." : summary?.totalUsers ?? 0}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Toplam Kullanıcı</h3>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Palette className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{loading ? "..." : artworks.length}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Toplam Eser</h3>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <span className="text-2xl font-light">{loading ? "..." : formatPrice(summary?.totalRevenue ?? 0)}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Toplam Gelir</h3>
            <p className="text-sm opacity-75 mt-1">{summary?.totalSales ?? 0} sipariş</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{loading ? "..." : summary?.activeEvents ?? 0}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Aktif Etkinlik</h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { k: "overview", label: "Genel Bakış" },
            { k: "artworks", label: "Eserler" },
            { k: "workshops", label: "Atölyeler" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setActiveTab(t.k as any)}
              className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                activeTab === t.k
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl"
                  : "bg-muted/50 hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl mb-6 font-light flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span>Özet</span>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-muted-foreground font-light">Tamamlanan Sipariş</span>
                  <span className="text-2xl font-light">{summary?.totalSales ?? 0}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/30">
                  <span className="text-muted-foreground font-light">Toplam Gelir</span>
                  <span className="text-2xl font-light text-green-600">{formatPrice(summary?.totalRevenue ?? 0)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground font-light">Aktif Etkinlik</span>
                  <span className="text-2xl font-light">{summary?.activeEvents ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl mb-6 font-light flex items-center space-x-2">
                <Eye className="w-6 h-6 text-primary" />
                <span>En Çok Yorumlanan Eserler</span>
              </h2>
              <div className="space-y-3">
                {artworkStats.slice(0, 5).map((s) => (
                  <div key={s.artwork_id} className="p-3 bg-muted/30 rounded-2xl flex justify-between">
                    <span className="font-light">{s.title}</span>
                    <span className="text-sm text-muted-foreground">{s.total_reviews} yorum · ⭐ {parseFloat(s.average_rating).toFixed(1)}</span>
                  </div>
                ))}
                {artworkStats.length === 0 && (
                  <p className="text-muted-foreground font-light text-sm">Veri yok</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "artworks" && (
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl mb-6 font-light">Eser Yönetimi ({artworks.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4 font-light">Eser</th>
                    <th className="text-left py-4 px-4 font-light">Sanatçı</th>
                    <th className="text-center py-4 px-4 font-light">Fiyat</th>
                    <th className="text-center py-4 px-4 font-light">Durum</th>
                    <th className="text-center py-4 px-4 font-light">Görüntülenme</th>
                    <th className="text-center py-4 px-4 font-light">Yorum</th>
                    <th className="text-right py-4 px-4 font-light">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {artworks.map((a) => {
                    const stat = statByArtworkId.get(a.artwork_id);
                    return (
                      <tr key={a.artwork_id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4 font-light">{a.title}</td>
                        <td className="py-4 px-4 text-muted-foreground font-light">{a.artist_name || "-"}</td>
                        <td className="py-4 px-4 text-center font-light">{formatPrice(a.price)}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            a.stock_status === "Available" ? "bg-green-500/10 text-green-600" :
                            a.stock_status === "Sold" ? "bg-red-500/10 text-red-600" :
                            "bg-yellow-500/10 text-yellow-600"
                          }`}>
                            {a.stock_status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-muted-foreground font-light">{stat?.view_count ?? a.view_count ?? 0}</td>
                        <td className="py-4 px-4 text-center text-muted-foreground font-light">{stat?.total_reviews ?? 0}</td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleDeleteArtwork(a.artwork_id, a.title)}
                            className="px-3 py-1 text-sm bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "workshops" && (
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl mb-6 font-light">Atölye Yönetimi ({events.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4 font-light">Atölye</th>
                    <th className="text-center py-4 px-4 font-light">Tarih</th>
                    <th className="text-center py-4 px-4 font-light">Kalan Kontenjan</th>
                    <th className="text-center py-4 px-4 font-light">Rezervasyon</th>
                    <th className="text-center py-4 px-4 font-light">Doluluk</th>
                    <th className="text-center py-4 px-4 font-light">Fiyat</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => {
                    const stat = statByEventId.get(e.event_id);
                    return (
                      <tr key={e.event_id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-4 font-light">{e.title}</td>
                        <td className="py-4 px-4 text-center text-muted-foreground font-light">
                          {new Date(e.date).toLocaleDateString("tr-TR")}
                        </td>
                        <td className="py-4 px-4 text-center font-light">{e.capacity}</td>
                        <td className="py-4 px-4 text-center text-muted-foreground font-light">{stat?.total_reservations ?? 0}</td>
                        <td className="py-4 px-4 text-center font-light">{stat?.occupancy_rate ? `%${parseFloat(stat.occupancy_rate).toFixed(0)}` : "-"}</td>
                        <td className="py-4 px-4 text-center font-light">{formatPrice(e.price)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
