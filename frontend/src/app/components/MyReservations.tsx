import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Calendar, Clock, Users, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";
import type { ApiList } from "../../lib/types";
import { formatPrice } from "../../lib/formatters";

// Backend response (controllers/reservationController.js -> getMyReservations)
interface ReservationItem {
  reservation_id: string;
  participant_count: number;
  total_price: string;
  booking_date: string;
  event_title: string;
  event_date: string;
}

export default function MyReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      navigate("/login");
      return;
    }
    let cancelled = false;
    const load = async () => {
      try {
        const res = await api.get<ApiList<ReservationItem>>("/reservations/my-reservations");
        if (cancelled) return;
        setReservations(res.data);
      } catch (err) {
        console.error("Rezervasyonlar yüklenemedi:", err);
        toast.error("Rezervasyonlar yüklenemedi");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [navigate]);

  const handleCancelReservation = async (reservationId: string) => {
    if (!window.confirm("Rezervasyonu iptal etmek istediğinizden emin misiniz?")) return;
    setCancelling(reservationId);
    try {
      await api.delete(`/reservations/${reservationId}`);
      setReservations((prev) => prev.filter((r) => r.reservation_id !== reservationId));
      toast.success("Rezervasyon iptal edildi");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "İptal başarısız";
      toast.error(message);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-10 h-10 text-primary" />
            <h1 className="text-6xl font-light">Rezervasyonlarım</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">
            {loading ? "Yükleniyor..." : `${reservations.length} rezervasyon`}
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-muted/30 rounded-3xl h-48" />
            ))}
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="text-3xl text-muted-foreground mb-4 font-light">Henüz rezervasyonunuz yok</p>
            <Link to="/workshops" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
              Atölyelere Göz Atın
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => {
              const eventDate = r.event_date ? new Date(r.event_date.replace(" ", "T")) : null;
              return (
                <div key={r.reservation_id} className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-xl p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl mb-2 font-light">{r.event_title}</h3>
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium inline-flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Onaylandı</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl mb-1 font-light">{formatPrice(r.total_price)}</p>
                      <p className="text-sm text-muted-foreground font-light">Toplam Tutar</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground font-light">Tarih</p>
                        <p className="font-medium">{eventDate ? eventDate.toLocaleDateString("tr-TR") : "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground font-light">Saat</p>
                        <p className="font-medium">{eventDate ? eventDate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) : "-"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground font-light">Katılımcı</p>
                        <p className="font-medium">{r.participant_count} Kişi</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-6 border-t border-border/50">
                    <button
                      onClick={() => handleCancelReservation(r.reservation_id)}
                      disabled={cancelling === r.reservation_id}
                      className="px-4 py-2 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      <span>{cancelling === r.reservation_id ? "İptal ediliyor..." : "İptal Et"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
