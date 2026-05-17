import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Shield, Users, Palette, Calendar, DollarSign, TrendingUp, MessageSquare, Eye, Heart, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface AdminDashboardProps {
  isLoggedIn: boolean;
}

export default function AdminDashboard({ isLoggedIn }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "artworks" | "workshops" | "tickets">("overview");

  const [stats] = useState({
    totalUsers: 1247,
    totalArtists: 89,
    totalArtworks: 456,
    totalWorkshops: 34,
    totalRevenue: 342500,
    monthlyRevenue: 45000,
    pendingTickets: 12,
    activeReservations: 67
  });

  const [users] = useState([
    { id: 1, name: "Ayşe Demir", email: "ayse@example.com", role: "artist", joinDate: "2026-03-15", status: "active" },
    { id: 2, name: "Mehmet Yılmaz", email: "mehmet@example.com", role: "user", joinDate: "2026-04-20", status: "active" },
    { id: 3, name: "Elif Kaya", email: "elif@example.com", role: "user", joinDate: "2026-05-10", status: "active" },
    { id: 4, name: "Can Öztürk", email: "can@example.com", role: "artist", joinDate: "2026-02-28", status: "active" }
  ]);

  const [artworks] = useState([
    { id: 1, title: "Renklerin Dansı", artist: "Ayşe Demir", price: 15000, status: "active", sales: 2, views: 342 },
    { id: 2, title: "İç Dünya", artist: "Can Öztürk", price: 18000, status: "pending", sales: 0, views: 89 },
    { id: 3, title: "Doğanın Sesi", artist: "Ayşe Demir", price: 12000, status: "active", sales: 1, views: 256 }
  ]);

  const [workshops] = useState([
    { id: 1, title: "Yağlı Boya Teknikleri", instructor: "Ayşe Demir", date: "2026-05-20", participants: 4, maxParticipants: 12, revenue: 1800 },
    { id: 2, title: "Suluboya ile Manzara", instructor: "Mehmet Yılmaz", date: "2026-05-22", participants: 5, maxParticipants: 10, revenue: 1900 },
    { id: 3, title: "Modern Heykel Atölyesi", instructor: "Can Öztürk", date: "2026-05-25", participants: 3, maxParticipants: 8, revenue: 1800 }
  ]);

  const [tickets] = useState([
    { id: 1, user: "Elif Yıldız", subject: "Ödeme Sorunu", category: "payment", status: "open", date: "2026-05-14", priority: "high" },
    { id: 2, user: "Mehmet Kara", subject: "Eser Görseli Yüklenmiyor", category: "technical", status: "in-progress", date: "2026-05-13", priority: "medium" },
    { id: 3, user: "Zeynep Ak", subject: "Rezervasyon İptali", category: "reservation", status: "resolved", date: "2026-05-12", priority: "low" }
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.role !== "admin") {
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
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-5xl md:text-6xl font-light">Admin Paneli</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">Hoş geldiniz, {user.name}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{stats.totalUsers}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Toplam Kullanıcı</h3>
            <p className="text-sm opacity-75 mt-1">{stats.totalArtists} sanatçı</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
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
              <span className="text-3xl font-light">₺{(stats.monthlyRevenue / 1000).toFixed(0)}K</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Aylık Gelir</h3>
            <p className="text-sm opacity-75 mt-1">Toplam: ₺{(stats.totalRevenue / 1000).toFixed(0)}K</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 opacity-80" />
              <span className="text-3xl font-light">{stats.pendingTickets}</span>
            </div>
            <h3 className="text-lg opacity-90 font-light">Bekleyen Talepler</h3>
            <p className="text-sm opacity-75 mt-1">Destek talepleri</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === "users"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            Kullanıcılar
          </button>
          <button
            onClick={() => setActiveTab("artworks")}
            className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === "artworks"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            Eserler
          </button>
          <button
            onClick={() => setActiveTab("workshops")}
            className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === "workshops"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            Atölyeler
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
              activeTab === "tickets"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-xl"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            Destek Talepleri
          </button>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl mb-6 font-light flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span>Son 30 Gün Aktivitesi</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground font-light">Yeni Kullanıcılar</span>
                    <span className="text-2xl font-light">+127</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground font-light">Yeni Eserler</span>
                    <span className="text-2xl font-light">+45</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground font-light">Rezervasyonlar</span>
                    <span className="text-2xl font-light">{stats.activeReservations}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground font-light">Toplam Gelir</span>
                    <span className="text-2xl font-light text-green-600">₺{stats.monthlyRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl mb-6 font-light flex items-center space-x-2">
                  <Eye className="w-6 h-6 text-primary" />
                  <span>Popüler İçerikler</span>
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-2xl">
                    <p className="font-medium mb-1">En Çok Görüntülenen Eser</p>
                    <p className="text-sm text-muted-foreground font-light">Renklerin Dansı (342 görüntüleme)</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-2xl">
                    <p className="font-medium mb-1">En Popüler Atölye</p>
                    <p className="text-sm text-muted-foreground font-light">Yağlı Boya Teknikleri (12/12 dolu)</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-2xl">
                    <p className="font-medium mb-1">En Çok Favorilenen</p>
                    <p className="text-sm text-muted-foreground font-light">İç Dünya (89 favori)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl mb-6 font-light">Kullanıcı Yönetimi</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4 font-light">Kullanıcı</th>
                    <th className="text-left py-4 px-4 font-light">E-posta</th>
                    <th className="text-center py-4 px-4 font-light">Rol</th>
                    <th className="text-center py-4 px-4 font-light">Kayıt Tarihi</th>
                    <th className="text-center py-4 px-4 font-light">Durum</th>
                    <th className="text-right py-4 px-4 font-light">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 font-light">{user.name}</td>
                      <td className="py-4 px-4 text-muted-foreground font-light">{user.email}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.role === "artist"
                            ? "bg-purple-500/10 text-purple-600"
                            : "bg-blue-500/10 text-blue-600"
                        }`}>
                          {user.role === "artist" ? "Sanatçı" : "Kullanıcı"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-muted-foreground font-light">
                        {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-600">
                          Aktif
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                            Görüntüle
                          </button>
                          <button className="px-3 py-1 text-sm bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded-lg transition-colors">
                            Askıya Al
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "artworks" && (
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl mb-6 font-light">Eser Yönetimi</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4 font-light">Eser</th>
                    <th className="text-left py-4 px-4 font-light">Sanatçı</th>
                    <th className="text-center py-4 px-4 font-light">Fiyat</th>
                    <th className="text-center py-4 px-4 font-light">Durum</th>
                    <th className="text-center py-4 px-4 font-light">Satış</th>
                    <th className="text-center py-4 px-4 font-light">Görüntülenme</th>
                    <th className="text-right py-4 px-4 font-light">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {artworks.map((artwork) => (
                    <tr key={artwork.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 font-light">{artwork.title}</td>
                      <td className="py-4 px-4 text-muted-foreground font-light">{artwork.artist}</td>
                      <td className="py-4 px-4 text-center font-light">₺{artwork.price.toLocaleString()}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          artwork.status === "active"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }`}>
                          {artwork.status === "active" ? "Aktif" : "Onay Bekliyor"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-light">{artwork.sales}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground font-light">{artwork.views}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          {artwork.status === "pending" && (
                            <>
                              <button className="p-2 hover:bg-green-500/10 text-green-600 rounded-lg transition-colors">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-red-500/10 text-red-600 rounded-lg transition-colors">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                            Düzenle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "workshops" && (
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl mb-6 font-light">Atölye Yönetimi</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-4 font-light">Atölye</th>
                    <th className="text-left py-4 px-4 font-light">Eğitmen</th>
                    <th className="text-center py-4 px-4 font-light">Tarih</th>
                    <th className="text-center py-4 px-4 font-light">Katılımcılar</th>
                    <th className="text-center py-4 px-4 font-light">Gelir</th>
                    <th className="text-right py-4 px-4 font-light">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {workshops.map((workshop) => (
                    <tr key={workshop.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 font-light">{workshop.title}</td>
                      <td className="py-4 px-4 text-muted-foreground font-light">{workshop.instructor}</td>
                      <td className="py-4 px-4 text-center text-muted-foreground font-light">
                        {new Date(workshop.date).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-light ${workshop.participants === workshop.maxParticipants ? "text-green-600" : ""}`}>
                          {workshop.participants}/{workshop.maxParticipants}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-light text-green-600">
                        ₺{workshop.revenue.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                            Detaylar
                          </button>
                          <button className="px-3 py-1 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
                            Düzenle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl mb-6 font-light">Destek Talepleri</h2>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-6 bg-muted/30 rounded-2xl border border-border/30 hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium">{ticket.subject}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          ticket.priority === "high"
                            ? "bg-red-500/10 text-red-600"
                            : ticket.priority === "medium"
                            ? "bg-yellow-500/10 text-yellow-600"
                            : "bg-green-500/10 text-green-600"
                        }`}>
                          {ticket.priority === "high" ? "Yüksek" : ticket.priority === "medium" ? "Orta" : "Düşük"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground font-light mb-2">
                        Kullanıcı: {ticket.user} • {new Date(ticket.date).toLocaleDateString('tr-TR')}
                      </p>
                      <p className="text-sm text-muted-foreground font-light">
                        Kategori: {ticket.category === "payment" ? "Ödeme" : ticket.category === "technical" ? "Teknik" : "Rezervasyon"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        ticket.status === "resolved"
                          ? "bg-green-500/10 text-green-600"
                          : ticket.status === "in-progress"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-orange-500/10 text-orange-600"
                      }`}>
                        {ticket.status === "resolved" ? "Çözüldü" : ticket.status === "in-progress" ? "İşlemde" : "Açık"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-4 border-t border-border/30">
                    {ticket.status !== "resolved" && (
                      <>
                        <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          Yanıtla
                        </button>
                        <button className="px-4 py-2 text-sm bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors">
                          Çözüldü Olarak İşaretle
                        </button>
                      </>
                    )}
                    <button className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                      Detayları Gör
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
