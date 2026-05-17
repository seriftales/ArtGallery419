import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Calendar, Clock, Users, MapPin, Star, ArrowLeft, User, Phone, Mail, Tag, Check } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const WORKSHOP_DATA = {
  id: 1,
  image: "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  title: "Yağlı Boya Teknikleri",
  instructor: "Ayşe Demir",
  description: "Klasik ve modern yağlı boya tekniklerini öğrenin",
  fullDescription: "Bu atölyede yağlı boya sanatının temellerinden ileri tekniklerine kadar geniş bir yelpazede bilgi edineceksiniz. Renk karıştırma, ışık-gölge çalışmaları, perspektif ve kompozisyon gibi konularda uygulamalı eğitim alacaksınız.",
  date: "2026-05-20",
  time: "14:00",
  duration: "3 saat",
  price: 450,
  spots: 8,
  maxSpots: 12,
  level: "Başlangıç",
  category: "Resim",
  rating: 4.9,
  reviews: 45,
  location: "Kadıköy Atölyesi",
  address: "Kadıköy Mah. Sanat Sok. No:15 Kadıköy/İstanbul",
  materials: ["Yağlı boya seti", "Fırçalar", "Tuval", "Palet"]
};

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workshop] = useState(WORKSHOP_DATA);
  const [participants, setParticipants] = useState(1);
  const [showReservationForm, setShowReservationForm] = useState(false);
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
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    if (user) {
      const userData = JSON.parse(user);
      setUserRole(userData.role);
    }
  }, []);

  const CAMPAIGN_CODES: Record<string, { discount: number; description: string }> = {
    "SANAT20": { discount: 20, description: "%20 İndirim" },
    "ATOLYE15": { discount: 15, description: "%15 İndirim" },
    "YAZ2026": { discount: 25, description: "%25 Yaz İndirimi" }
  };

  const applyCampaignCode = () => {
    const code = campaignCode.toUpperCase();
    if (CAMPAIGN_CODES[code]) {
      setDiscount(CAMPAIGN_CODES[code].discount);
      setCampaignError("");
    } else {
      setDiscount(0);
      setCampaignError("Geçersiz kampanya kodu!");
    }
  };

  const calculateTotal = () => {
    const subtotal = workshop.price * participants;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();

    const totalPrice = calculateTotal();

    const reservation = {
      id: Date.now(),
      workshopId: workshop.id,
      workshopTitle: workshop.title,
      workshopDate: workshop.date,
      workshopTime: workshop.time,
      participants,
      totalPrice,
      campaignCode: discount > 0 ? campaignCode : null,
      discount,
      ...formData,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    const existingReservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    localStorage.setItem("reservations", JSON.stringify([...existingReservations, reservation]));

    toast.success(`Rezervasyonunuz başarıyla oluşturuldu! Toplam: ₺${totalPrice.toLocaleString()}`);
    navigate("/my-reservations");
  };

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
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-96 object-cover rounded-3xl mb-6 shadow-2xl"
              />

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {workshop.category}
                </span>
                <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                  {workshop.level}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl mb-4 font-light">{workshop.title}</h1>
              <p className="text-2xl text-muted-foreground mb-8 font-light">Eğitmen: {workshop.instructor}</p>

              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(workshop.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg">{workshop.rating.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{workshop.reviews} değerlendirme</span>
              </div>
            </div>

            <div className="p-8 bg-muted/30 rounded-3xl backdrop-blur-sm border border-border/50">
              <h2 className="text-3xl mb-4 font-light">Atölye Hakkında</h2>
              <p className="text-muted-foreground leading-relaxed font-light mb-4">{workshop.description}</p>
              <p className="text-muted-foreground leading-relaxed font-light">{workshop.fullDescription}</p>
            </div>

            <div className="p-8 bg-muted/30 rounded-3xl backdrop-blur-sm border border-border/50">
              <h2 className="text-3xl mb-4 font-light">Sağlanan Malzemeler</h2>
              <ul className="space-y-3">
                {workshop.materials.map((material, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-light">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reservation Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
              <div className="mb-6">
                <div className="text-4xl mb-2 font-light">₺{workshop.price}</div>
                <p className="text-sm text-muted-foreground font-light">Kişi başı ücret</p>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-light">Tarih</p>
                    <p className="font-medium">{new Date(workshop.date).toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-light">Saat ve Süre</p>
                    <p className="font-medium">{workshop.time} - {workshop.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground font-light">Kontenjan</p>
                    <p className={`font-medium ${workshop.spots < 5 ? "text-red-600" : ""}`}>
                      {workshop.spots}/{workshop.maxSpots} kişi
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground font-light">Konum</p>
                    <p className="font-medium">{workshop.location}</p>
                    <p className="text-sm text-muted-foreground mt-1 font-light">{workshop.address}</p>
                  </div>
                </div>
              </div>

              {/* Admin: Sadece görüntüleme */}
              {userRole === 'admin' ? (
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
                  disabled={workshop.spots === 0}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {workshop.spots === 0 ? "Kontenjan Dolu" : "Rezervasyon Yap"}
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
                      {Array.from({ length: Math.min(workshop.spots, 5) }, (_, i) => i + 1).map((num) => (
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
                          placeholder="SANAT20"
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
                        <span>₺{(workshop.price * participants).toLocaleString()}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between items-center text-green-600 font-light">
                          <span>İndirim (%{discount})</span>
                          <span>-₺{((workshop.price * participants * discount) / 100).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-4 pt-2 border-t border-border/30">
                        <span className="text-muted-foreground font-light">Toplam Tutar</span>
                        <span className="text-3xl font-light">₺{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 font-medium"
                  >
                    Rezervasyonu Onayla
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
