import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Calendar, Clock, Users, X, Edit, CheckCircle } from "lucide-react";

export default function MyReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }
    const storedReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    setReservations(storedReservations);
  }, [navigate]);

  const handleCancelReservation = (id: number) => {
    if (window.confirm("Rezervasyonu iptal etmek istediğinizden emin misiniz?")) {
      const updatedReservations = reservations.map(r => r.id === id ? { ...r, status: "cancelled" } : r);
      setReservations(updatedReservations);
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    }
  };

  const activeReservations = reservations.filter(r => r.status === "confirmed");
  const pastReservations = reservations.filter(r => r.status === "cancelled");

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-10 h-10 text-primary" />
            <h1 className="text-6xl font-light">Rezervasyonlarım</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">{activeReservations.length} aktif rezervasyon</p>
        </div>

        {reservations.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="text-3xl text-muted-foreground mb-4 font-light">Henüz rezervasyonunuz yok</p>
            <Link to="/workshops" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
              Atölyelere Göz Atın
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {activeReservations.length > 0 && (
              <div>
                <h2 className="text-3xl mb-6 font-light">Aktif Rezervasyonlar</h2>
                <div className="space-y-4">
                  {activeReservations.map((reservation) => (
                    <div key={reservation.id} className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-xl p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl mb-2 font-light">{reservation.workshopTitle}</h3>
                          <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-medium flex items-center space-x-1 inline-flex">
                            <CheckCircle className="w-4 h-4" />
                            <span>Onaylandı</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl mb-1 font-light">₺{reservation.totalPrice}</p>
                          <p className="text-sm text-muted-foreground font-light">Toplam Tutar</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground font-light">Tarih</p>
                            <p className="font-medium">{new Date(reservation.workshopDate).toLocaleDateString('tr-TR')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground font-light">Saat</p>
                            <p className="font-medium">{reservation.workshopTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground font-light">Katılımcı</p>
                            <p className="font-medium">{reservation.participants} Kişi</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-6 border-t border-border/50">
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors flex items-center space-x-2">
                          <Edit className="w-4 h-4" />
                          <span>Düzenle</span>
                        </button>
                        <button onClick={() => handleCancelReservation(reservation.id)} className="px-4 py-2 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-colors flex items-center space-x-2">
                          <X className="w-4 h-4" />
                          <span>İptal Et</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
