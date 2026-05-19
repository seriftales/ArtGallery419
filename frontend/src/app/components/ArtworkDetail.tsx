import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, Star, ArrowLeft, ShoppingCart, ThumbsUp, Share2, Tag, Check, User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ARTWORKS_DATA: Record<number, any> = {
  1: {
    id: 1,
    image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    title: "Renklerin Dansı",
    artist: "Ayşe Demir",
    category: "Yağlı Boya",
    price: 15000,
    year: 2024,
    size: "100x80 cm",
    rating: 4.8,
    reviews: 24,
    views: 342,
    description: "Canlı renkler ve dinamik fırça darbeleriyle yaratılmış modern bir eser. Sanatçının doğa ve insan ruhunun uyumunu yansıttığı bu çalışma, izleyiciyi içsel bir yolculuğa çıkarıyor.",
    technique: "Tuval üzerine yağlı boya"
  },
  2: {
    id: 2,
    image: "https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    title: "Sessiz Anlar",
    artist: "Mehmet Yılmaz",
    category: "Akrilik",
    price: 12500,
    year: 2023,
    size: "90x70 cm",
    rating: 4.6,
    reviews: 18,
    views: 215,
    description: "İç huzuru ve sessizliği temsil eden minimalist bir çalışma.",
    technique: "Tuval üzerine akrilik"
  },
  3: {
    id: 3,
    image: "https://images.unsplash.com/photo-1580687580441-96dbadf8f3c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
    title: "İç Dünya",
    artist: "Zeynep Kaya",
    category: "Karma Teknik",
    price: 18000,
    year: 2024,
    size: "120x100 cm",
    rating: 4.9,
    reviews: 32,
    views: 428,
    description: "İnsan psikolojisini ve duygusal derinliği keşfeden bir eser.",
    technique: "Karma teknik"
  }
};

const REVIEWS_BY_ARTWORK: Record<number, any[]> = {
  1: [
    {
      id: 1,
      userName: "Elif Yıldız",
      rating: 5,
      comment: "Harika bir eser! Renk kullanımı ve tekniği gerçekten etkileyici. Evime çok yakıştı.",
      date: "2026-05-10",
      helpful: 12,
      verified: true,
      artistReply: {
        name: "Ayşe Demir",
        comment: "Çok teşekkür ederim! Bu eserin sizin evinizde olması beni çok mutlu etti. İyi günlerde kullanın!",
        date: "2026-05-11"
      }
    },
    {
      id: 2,
      userName: "Mehmet Kara",
      rating: 4,
      comment: "Çok güzel bir çalışma. Fiyatı biraz yüksek ama kalitesi buna değer.",
      date: "2026-05-08",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      userName: "Selin Ak",
      rating: 5,
      comment: "Bu eserdeki detaylar inanılmaz. Sanatçının ustalığı her fırça darbesinde hissediliyor.",
      date: "2026-05-06",
      helpful: 15,
      verified: true
    }
  ],
  2: [
    {
      id: 4,
      userName: "Ahmet Yılmaz",
      rating: 5,
      comment: "Minimalist yaklaşımı ve huzur veren atmosferi çok beğendim. Harika!",
      date: "2026-05-09",
      helpful: 7,
      verified: true
    }
  ],
  3: [
    {
      id: 5,
      userName: "Deniz Kaya",
      rating: 5,
      comment: "Derin ve düşündürücü bir eser. İçsel yolculuğa çıkarıyor.",
      date: "2026-05-07",
      helpful: 10,
      verified: true
    },
    {
      id: 6,
      userName: "Cem Özkan",
      rating: 4,
      comment: "Teknik olarak mükemmel. Çok etkileyici bir çalışma.",
      date: "2026-05-05",
      helpful: 5,
      verified: true
    }
  ]
};

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const artworkId = parseInt(id || "1");
  const artwork = ARTWORKS_DATA[artworkId] || ARTWORKS_DATA[1];
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [campaignCode, setCampaignCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [campaignError, setCampaignError] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [purchaseFormData, setPurchaseFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });

  const CAMPAIGN_CODES: Record<string, { discount: number; description: string }> = {
    "SANAT20": { discount: 20, description: "%20 İndirim" },
    "ESER15": { discount: 15, description: "%15 İndirim" },
    "YAZ2026": { discount: 25, description: "%25 Yaz İndirimi" }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    if (user) {
      const userData = JSON.parse(user);
      setUserRole(userData.role);
      setUserName(userData.name);
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(artworkId));

    // Her eser için yorumları yükle
    setReviews(REVIEWS_BY_ARTWORK[artworkId] || []);
  }, [id, artworkId]);

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      toast.error("Favorilere eklemek için giriş yapmalısınız!");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const artworkId = parseInt(id || "1");

    const newFavorites = favorites.includes(artworkId)
      ? favorites.filter((fId: number) => fId !== artworkId)
      : [...favorites, artworkId];

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("favoritesUpdated"));

    if (newFavorites.includes(artworkId)) {
      toast.success("Favorilere eklendi!");
    } else {
      toast.info("Favorilerden çıkarıldı");
    }
  };

  const toggleHelpful = (reviewId: number) => {
    setHelpfulReviews(prev =>
      prev.includes(reviewId) ? prev.filter(id => id !== reviewId) : [...prev, reviewId]
    );
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `${artwork.title} - ${artwork.artist} | ArtGallery419`;

    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url);
        toast.success("Link kopyalandı!");
        setShowShareMenu(false);
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareMenu(false);
    toast.success(`${platform === "whatsapp" ? "WhatsApp" : platform === "twitter" ? "Twitter" : "Facebook"}'ta paylaşılıyor...`);
  };

  const applyCampaignCode = () => {
    const code = campaignCode.toUpperCase();
    if (CAMPAIGN_CODES[code]) {
      setDiscount(CAMPAIGN_CODES[code].discount);
      setCampaignError("");
      toast.success(`${CAMPAIGN_CODES[code].description} uygulandı!`);
    } else {
      setDiscount(0);
      setCampaignError("Geçersiz kampanya kodu!");
      toast.error("Geçersiz kampanya kodu!");
    }
  };

  const calculateTotal = () => {
    const subtotal = artwork.price;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();

    const totalPrice = calculateTotal();

    const purchase = {
      id: Date.now(),
      artworkId: artwork.id,
      artworkTitle: artwork.title,
      artworkArtist: artwork.artist,
      price: artwork.price,
      totalPrice,
      campaignCode: discount > 0 ? campaignCode : null,
      discount,
      ...purchaseFormData,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    const existingPurchases = JSON.parse(localStorage.getItem("purchases") || "[]");
    localStorage.setItem("purchases", JSON.stringify([...existingPurchases, purchase]));

    toast.success(`Satın alım başarılı! Toplam: ₺${totalPrice.toLocaleString()}`);
    setShowPurchaseForm(false);
    navigate("/profile");
  };

  const handleArtistReply = (reviewId: number) => {
    if (!replyText.trim()) {
      toast.error("Lütfen bir yanıt yazın");
      return;
    }

    // Yanıtı ekle
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          artistReply: {
            name: userName,
            comment: replyText,
            date: new Date().toISOString()
          }
        };
      }
      return review;
    });

    setReviews(updatedReviews);
    toast.success("Yanıtınız gönderildi!");
    setReplyText("");
    setReplyingTo(null);
  };

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/artworks"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Eserlere Dön</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="relative">
            <div className="sticky top-32">
              <ImageWithFallback
                src={artwork.image}
                alt={artwork.title}
                className="w-full rounded-3xl shadow-2xl"
              />
              {/* Favoriler: Admin hariç */}
              {userRole !== 'admin' && (
                <button
                  onClick={toggleFavorite}
                  className={`absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-all hover:scale-110 shadow-lg ${
                    !isLoggedIn ? "opacity-60" : ""
                  }`}
                  title={!isLoggedIn ? "Favorilere eklemek için giriş yapın" : ""}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-4">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {artwork.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl mb-4 font-light">{artwork.title}</h1>
            <p className="text-2xl text-muted-foreground mb-8 font-light">{artwork.artist}</p>

            <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{reviews.length} değerlendirme</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{artwork.views} görüntülenme</span>
            </div>

            <div className="text-5xl mb-8 font-light">₺{artwork.price.toLocaleString('tr-TR')}</div>

            <div className="space-y-4 mb-8 p-6 bg-muted/30 rounded-2xl">
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-muted-foreground font-light">Boyut</span>
                <span>{artwork.size}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border/50">
                <span className="text-muted-foreground font-light">Yıl</span>
                <span>{artwork.year}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground font-light">Teknik</span>
                <span>{artwork.technique}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl mb-4 font-light">Açıklama</h3>
              <p className="text-muted-foreground leading-relaxed font-light">{artwork.description}</p>
            </div>

            {/* Admin: Sadece görüntüleme */}
            {userRole === 'admin' ? (
              <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                <p className="text-center text-muted-foreground font-light">
                  Bu eser admin panelinden yönetilebilir
                </p>
              </div>
            ) : !showPurchaseForm ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      toast.error("Satın almak için giriş yapmalısınız!");
                    } else {
                      setShowPurchaseForm(true);
                    }
                  }}
                  className="flex-1 px-8 py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">Satın Al</span>
                </button>
                <button
                  onClick={toggleFavorite}
                  className={`px-8 py-5 bg-secondary text-secondary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 ${
                    !isLoggedIn ? "opacity-60" : ""
                  }`}
                  title={!isLoggedIn ? "Favorilere eklemek için giriş yapın" : ""}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                  <span className="font-medium">{isFavorite ? "Favorilerde" : "Favorilere Ekle"}</span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="px-6 py-5 bg-muted hover:bg-muted/80 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  {showShareMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-2xl shadow-2xl p-3 min-w-[200px] z-50">
                      <button
                        onClick={() => handleShare("whatsapp")}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-muted rounded-xl transition-colors text-left"
                      >
                        <span className="text-green-500 text-xl">📱</span>
                        <span>WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-muted rounded-xl transition-colors text-left"
                      >
                        <span className="text-blue-400 text-xl">🐦</span>
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-muted rounded-xl transition-colors text-left"
                      >
                        <span className="text-blue-600 text-xl">📘</span>
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-muted rounded-xl transition-colors text-left border-t border-border/50 mt-2 pt-3"
                      >
                        <span className="text-muted-foreground text-xl">🔗</span>
                        <span>Linki Kopyala</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handlePurchase} className="space-y-4 p-6 bg-muted/30 rounded-2xl">
                <h3 className="text-2xl mb-4 font-light">Satın Alma Formu</h3>

                <div>
                  <label className="block mb-2 text-sm font-light">Ad Soyad</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={purchaseFormData.name}
                      onChange={(e) => setPurchaseFormData({ ...purchaseFormData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                      value={purchaseFormData.email}
                      onChange={(e) => setPurchaseFormData({ ...purchaseFormData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                      value={purchaseFormData.phone}
                      onChange={(e) => setPurchaseFormData({ ...purchaseFormData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-light">Teslimat Adresi</label>
                  <textarea
                    value={purchaseFormData.address}
                    onChange={(e) => setPurchaseFormData({ ...purchaseFormData, address: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    rows={3}
                    required
                  />
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
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                      <span>₺{artwork.price.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-green-600 font-light">
                        <span>İndirim (%{discount})</span>
                        <span>-₺{((artwork.price * discount) / 100).toLocaleString()}</span>
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
                  Satın Alımı Onayla
                </button>

                <button
                  type="button"
                  onClick={() => setShowPurchaseForm(false)}
                  className="w-full px-6 py-2 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-colors font-medium"
                >
                  İptal
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-border pt-16">
          <h2 className="text-4xl mb-8 font-light">Değerlendirmeler</h2>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg font-light">Henüz değerlendirme yapılmamış</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
              <div key={review.id} className="p-6 bg-muted/30 rounded-2xl backdrop-blur-sm border border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{review.userName}</p>
                      {review.verified && (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full font-medium">
                          Doğrulanmış Alıcı
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-light">
                      {new Date(review.date).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mb-4 leading-relaxed font-light">{review.comment}</p>

                {(review as any).artistReply && (
                  <div className="ml-6 mt-4 p-4 bg-primary/5 border-l-4 border-primary rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-medium text-primary">{(review as any).artistReply.name}</p>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                        Sanatçı
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground font-light mb-1">
                      {new Date((review as any).artistReply.date).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="font-light leading-relaxed">{(review as any).artistReply.comment}</p>
                  </div>
                )}

                {/* Sanatçı yanıt formu */}
                {userRole === 'artist' && userName === artwork.artist && !((review as any).artistReply) && (
                  <div className="mt-4">
                    {replyingTo === review.id ? (
                      <div className="ml-6 space-y-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                          rows={3}
                          placeholder="Yanıtınızı yazın..."
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleArtistReply(review.id)}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm"
                          >
                            Yanıtla
                          </button>
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors text-sm"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReplyingTo(review.id)}
                        className="text-sm text-primary hover:underline ml-6"
                      >
                        Yanıt Ver
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`flex items-center space-x-2 text-sm transition-colors mt-4 ${
                    helpfulReviews.includes(review.id)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${helpfulReviews.includes(review.id) ? "fill-current" : ""}`} />
                  <span>Faydalı ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})</span>
                </button>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
