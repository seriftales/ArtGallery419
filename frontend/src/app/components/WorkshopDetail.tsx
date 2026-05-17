import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Calendar, Clock, Users, ArrowLeft, User, Phone, Mail, Tag, Check } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { api, ApiError } from "../../lib/api";
import { validateCoupon } from "../../lib/coupon";
import { auth } from "../../lib/auth";
import type { ApiItem, ArtEvent } from "../../lib/types";
import { parsePrice, formatPrice, resolveImage } from "../../lib/formatters";

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workshop, setWorkshop] = useState<ArtEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState(1);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [campaignCode, setCampaignCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [campaignError, setCampaignError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const loggedIn = auth.isLoggedIn();
    const user = auth.getUser();
    setIsLoggedIn(loggedIn);
    setUserRole(user?.role ?? null);
    if (user) {
      setFormData((prev) => ({ ...prev, name: user.name || "", email: user.email || "" }));
    }

    const load = async () => {
      try {
        // Backend'de tek event endpoint'i var: GET /api/events/:id
        const res = await api.get<ApiItem<ArtEvent>>(`/events/${id}`, { skipAuth: true });
        if (cancelled) return;
        setWorkshop(res.data);
      } catch (err) {
        console.error("Atölye yüklenemedi:", err);
        toast.error("Atölye yüklenemedi");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const applyCampaignCode = async () => {
    if (!campaignCode.trim()) { setCampaignError("Lütfen bir kod girin"); return; }
    if (!isLoggedIn) { toast.error("Kampanya kodu kullanmak için giriş yapmalısınız!"); return; }
    try {
      const pct = await validateCoupon(campaignCode);
      if (pct > 0) {
        setDiscount(pct); setCampaignError(""); toast.success(`%${pct} indirim uygulandı!`);
      } else {
        setDiscount(0); setCampaignError("Geçersiz kampanya kodu!"); toast.error("Geçersiz kampanya kodu!");
      }
    } catch (err) {
      setDiscount(0);
      const message = err instanceof ApiError ? err.message : "Kupon doğrulanamadı";
      setCampaignError(message); toast.error(message);
    }
  };

  const calculateTotal = () => {
    if (!workshop) return 0;
    const subtotal = parsePrice(workshop.price) * participants;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshop) return;

    setSubmitting(true);
    try {
      await api.post("/reservations", {
        eventId: workshop.event_id,
        participantCount: participants,
      });
      toast.success("Rezervasyonunuz başarıyla oluşturuldu!");
      navigate("/my-reservations");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Rezervasyon başarısız";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto animate-pulse grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-muted rounded-3xl" />
            <div className="h-10 bg-muted rounded w-1/2" />
            <div className="h-32 bg-muted rounded" />
          </div>
          <div className="h-96 bg-muted rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Atölye bulunamadı</h1>
          <Link
            to="/workshops"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Atölyelere Dön</span>
          </Link>
        </div>
      </div>
    );
  }

  const isFull = workshop.capacity === 0;

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/workshops"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Atölyelere Dön</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <ImageWithFallback
                src={resolveImage(workshop.image_url, "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?w=1200")}
                alt={workshop.title}
                className="w-full h-96 object-cover rounded-3xl mb-6 shadow-2xl"
              />

              <h1 className="text-5xl md:text-6xl mb-4 font-light">{workshop.title}</h1>
            </div>

            {workshop.description && (
              <div className="p-8 bg-muted/30 rounded-3xl backdrop-blur-sm border border-border/50">
                <h2 className="text-3xl mb-4 font-light">Atölye Hakkında</h2>
                <p className="text-muted-foreground leading-relaxed font-light">{workshop.description}</p>
              </div>
            )}
          </div>

          {/* Reservation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
              <div className="mb-6">
                <div className="text-4xl mb-2 font-light">{formatPrice(workshop.price)}</div>
                <p className="text-sm text-muted-foreground font-light">Kişi başı ücret</p>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-light">Tarih</p>
                    <p className="font-medium">{new Date(workshop.date).toLocaleDateString("tr-TR")}</p>
                  </div>
                </div>
                {workshop.time && (
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-light">Saat</p>
                      <p className="font-medium">{workshop.time.slice(0, 5)}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-light">Kalan Kontenjan</p>
                    <p className={`font-medium ${workshop.capacity < 5 ? "text-red-600" : ""}`}>
                      {workshop.capacity} kişi
                    </p>
                  </div>
                </div>
              </div>

              {userRole === "Admin" ? (
                <div className="p-4 bg-muted/30 rounded-2xl border border-border/50 text-center">
                  <p className="text-muted-foreground font-light">
                    Bu atölye admin panelinden yönetilebilir
                  </p>
                </div>
              ) : !showReservationForm ? (
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast.error("Rezervasyon yapmak için giriş yapmalısınız!");
                      navigate("/login");
                      return;
                    }
                    setShowReservationForm(true);
                  }}
                  disabled={isFull}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium"
                >
                  {isFull ? "Kontenjan Dolu" : "Rezervasyon Yap"}
                </button>
              ) : (
                <form onSubmit={handleReservation} className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-light">Katılımcı Sayısı</label>
                    <select
                      value={participants}
                      onChange={(e) => setParticipants(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    >
                      {Array.from({ length: Math.min(workshop.capacity, 5) }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>{num} Kişi</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-light">Ad Soyad</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-light">E-posta</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-light">Telefon</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-light">Kampanya Kodu</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={campaignCode}
                          onChange={(e) => setCampaignCode(e.target.value.toUpperCase())}
                          placeholder="Kupon kodu"
                          className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={applyCampaignCode}
                        className="px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-all"
                      >
                        Uygula
                      </button>
                    </div>
                    {campaignError && (
                      <p className="text-sm text-red-500 mt-2">{campaignError}</p>
                    )}
                    {discount > 0 && (
                      <div className="flex items-center space-x-2 mt-2 text-sm text-green-600">
                        <Check className="w-4 h-4" />
                        <span>%{discount} indirim uygulandı!</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-muted-foreground font-light">
                        <span>Ara Toplam</span>
                        <span>₺{(parsePrice(workshop.price) * participants).toLocaleString("tr-TR")}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between items-center text-green-600 font-light">
                          <span>İndirim (%{discount})</span>
                          <span>-₺{((parsePrice(workshop.price) * participants * discount) / 100).toLocaleString("tr-TR")}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-4 pt-2 border-t border-border/30">
                        <span className="text-muted-foreground font-light">Toplam Tutar</span>
                        <span className="text-3xl font-light">₺{calculateTotal().toLocaleString("tr-TR")}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium"
                  >
                    {submitting ? "İşleniyor..." : "Rezervasyonu Onayla"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowReservationForm(false)}
                    className="w-full px-6 py-2 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-colors font-medium"
                  >
                    İptal
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
