import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, Star, ArrowLeft, ShoppingCart, ThumbsUp, Share2, Tag, Check, User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { api, ApiError } from "../../lib/api";
import { validateCoupon } from "../../lib/coupon";
import { auth } from "../../lib/auth";
import type { ApiList, ApiItem, Artwork, Review } from "../../lib/types";
import { parsePrice, formatPrice, resolveImage } from "../../lib/formatters";

type FavoriteRecord = { artwork_id?: string } & Record<string, unknown>;

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [campaignCode, setCampaignCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [campaignError, setCampaignError] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [purchaseFormData, setPurchaseFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [submittingPurchase, setSubmittingPurchase] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // İlk yükleme: eser + auth durum + favoriler + yorumlar
  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const loggedIn = auth.isLoggedIn();
    const user = auth.getUser();
    setIsLoggedIn(loggedIn);
    setUserRole(user?.role ?? null);
    setUserName(user?.name ?? "");

    const load = async () => {
      try {
        // Backend'de /api/artworks/:id endpoint'i yok, listeden filtreliyoruz
        const res = await api.get<ApiList<Artwork>>("/artworks", { skipAuth: true });
        if (cancelled) return;
        const found = res.data.find((a) => a.artwork_id === id);
        setArtwork(found || null);
        // Görüntülenme sayısını artır (arka planda, hata olursa görmezden gel)
        if (found) {
          api.patch(`/artworks/${found.artwork_id}/view`, undefined, { skipAuth: true }).catch(() => {});
        }
      } catch (err) {
        console.error("Eser yüklenemedi:", err);
        toast.error("Eser yüklenemedi");
      } finally {
        if (!cancelled) setLoading(false);
      }

      // Yorumları getir (public endpoint)
      try {
        const reviewsRes = await api.get<ApiList<Review>>(`/reviews/${id}`, { skipAuth: true });
        if (cancelled) return;
        setReviews(reviewsRes.data || []);
      } catch (err) {
        // 404 vs olabilir, sessizce geç
        console.warn("Yorumlar yüklenemedi:", err);
      }

      // Favori durumu (giriş varsa)
      if (loggedIn) {
        try {
          const favRes = await api.get<ApiList<FavoriteRecord>>("/favorites");
          if (cancelled) return;
          setIsFavorite(favRes.data.some((f) => f.artwork_id === id));
        } catch (err) {
          console.warn("Favori durumu okunamadı:", err);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      toast.error("Favorilere eklemek için giriş yapmalısınız!");
      return;
    }
    if (!artwork) return;

    const prev = isFavorite;
    setIsFavorite(!prev);
    window.dispatchEvent(new Event("favoritesUpdated"));

    try {
      if (prev) {
        await api.delete(`/favorites/${artwork.artwork_id}`);
        toast.info("Favorilerden çıkarıldı");
      } else {
        await api.post("/favorites", { artworkId: artwork.artwork_id });
        // Beğeni sayısını da artır (Artist dashboard ve liste için)
        api.patch(`/artworks/${artwork.artwork_id}/like`).catch(() => {});
        toast.success("Favorilere eklendi!");
      }
    } catch (err) {
      setIsFavorite(prev);
      window.dispatchEvent(new Event("favoritesUpdated"));
      const message = err instanceof ApiError ? err.message : "İşlem başarısız";
      toast.error(message);
    }
  };

  const toggleHelpful = async (reviewId: string) => {
    if (!isLoggedIn) {
      toast.error("Oy vermek için giriş yapmalısınız!");
      return;
    }

    const already = helpfulReviews.includes(reviewId);
    const next = already ? helpfulReviews.filter((id) => id !== reviewId) : [...helpfulReviews, reviewId];
    setHelpfulReviews(next);

    try {
      await api.patch(`/reviews/${reviewId}/vote`);
    } catch (err) {
      // Geri al
      setHelpfulReviews(helpfulReviews);
      const message = err instanceof ApiError ? err.message : "Oy verilemedi";
      toast.error(message);
    }
  };

  const handleShare = (platform: string) => {
    if (!artwork) return;
    const url = window.location.href;
    const text = `${artwork.title} - ${artwork.artist_name || ""} | ArtGallery419`;
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
        navigator.clipboard.writeText(url);
        toast.success("Link kopyalandı!");
        setShowShareMenu(false);
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

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
    if (!artwork) return 0;
    const subtotal = parsePrice(artwork.price);
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artwork) return;
    setSubmittingPurchase(true);
    try {
      await api.post("/orders", {
        artworkId: artwork.artwork_id,
        paymentMethod: paymentMethod,
      });
      const totalPrice = calculateTotal();
      toast.success(`Satın alım başarılı! Toplam: ₺${totalPrice.toLocaleString("tr-TR")}`);
      setShowPurchaseForm(false);
      navigate("/profile");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Satın alma başarısız";
      toast.error(message);
    } finally {
      setSubmittingPurchase(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artwork) return;
    if (!newComment.trim()) {
      toast.error("Lütfen bir yorum yazın");
      return;
    }
    setSubmittingReview(true);
    try {
      await api.post("/reviews", {
        targetId: artwork.artwork_id,
        targetType: "Artwork",
        rating: newRating,
        commentText: newComment,
      });
      toast.success("Değerlendirmeniz eklendi!");
      // Yorumları yeniden çek
      const reviewsRes = await api.get<ApiList<Review>>(`/reviews/${artwork.artwork_id}`, { skipAuth: true });
      setReviews(reviewsRes.data || []);
      setShowReviewForm(false);
      setNewComment("");
      setNewRating(5);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Değerlendirme eklenemedi";
      toast.error(message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleArtistReply = async (reviewId: string) => {
    if (!replyText.trim()) {
      toast.error("Lütfen bir yanıt yazın");
      return;
    }

    try {
      await api.patch(`/reviews/${reviewId}/reply`, { reply: replyText });
      // Lokal state'i güncelle
      setReviews((prev) =>
        prev.map((r) =>
          r.review_id === reviewId
            ? { ...r, artist_reply: replyText, artist_reply_date: new Date().toISOString() }
            : r
        )
      );
      toast.success("Yanıtınız gönderildi!");
      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Yanıt gönderilemedi";
      toast.error(message);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length
    : 0;

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[4/5] bg-muted rounded-3xl" />
            <div className="space-y-6">
              <div className="h-8 bg-muted rounded w-1/4" />
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-16 bg-muted rounded" />
              <div className="h-32 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Eser bulunamadı
  if (!artwork) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Eser bulunamadı</h1>
          <p className="text-muted-foreground mb-6">Aradığınız eser silinmiş veya hiç var olmamış olabilir.</p>
          <Link
            to="/artworks"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Eserlere Dön</span>
          </Link>
        </div>
      </div>
    );
  }

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
                src={resolveImage(artwork.image_url)}
                alt={artwork.title}
                className="w-full rounded-3xl shadow-2xl"
              />
              {userRole !== "Admin" && (
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
            {artwork.category && (
              <div className="mb-4">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {artwork.category}
                </span>
              </div>
            )}

            <h1 className="text-5xl md:text-6xl mb-4 font-light">{artwork.title}</h1>
            <p className="text-2xl text-muted-foreground mb-8 font-light">
              {artwork.artist_name || "Bilinmeyen sanatçı"}
            </p>

            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 mb-8 pb-8 border-b border-border">
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
              {(artwork.view_count ?? 0) > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{artwork.view_count} görüntülenme</span>
                </>
              )}
              {(artwork.like_count ?? 0) > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{artwork.like_count} beğeni</span>
                </>
              )}
            </div>

            <div className="text-5xl mb-8 font-light">{formatPrice(artwork.price)}</div>

            {artwork.description && (
              <div className="mb-8">
                <h3 className="text-2xl mb-4 font-light">Açıklama</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{artwork.description}</p>
              </div>
            )}

            {artwork.stock_status && artwork.stock_status !== "Available" && (
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-yellow-700 text-sm">
                Bu eser şu anda satın alınamıyor (Durum: {artwork.stock_status}).
              </div>
            )}

            {userRole === "Admin" ? (
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
                  disabled={artwork.stock_status !== "Available"}
                  className="flex-1 px-8 py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                  <label className="block mb-2 text-sm font-light">Ödeme Yöntemi</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="Credit Card">💳 Kredi Kartı</option>
                    <option value="Bank Transfer">🏦 Havale / EFT</option>
                    <option value="Cash">💵 Nakit</option>
                  </select>
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
                        placeholder="Kupon kodunuz"
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
                      <span>{formatPrice(artwork.price)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-green-600 font-light">
                        <span>İndirim (%{discount})</span>
                        <span>-₺{((parsePrice(artwork.price) * discount) / 100).toLocaleString("tr-TR")}</span>
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
                  disabled={submittingPurchase}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submittingPurchase ? "İşleniyor..." : "Satın Alımı Onayla"}
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
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-4xl font-light">Değerlendirmeler</h2>
            {isLoggedIn && userRole !== "Admin" && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
              >
                ⭐ Değerlendir
              </button>
            )}
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-muted/30 rounded-2xl border border-border/50 space-y-4">
              <h3 className="text-2xl font-light">Değerlendirmenizi paylaşın</h3>
              <div>
                <label className="block mb-2 text-sm font-light">Puanınız</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star className={`w-8 h-8 ${star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-light">Yorumunuz</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Bu eser hakkındaki düşüncelerinizi paylaşın..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-60"
                >
                  {submittingReview ? "Gönderiliyor..." : "Gönder"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowReviewForm(false); setNewComment(""); setNewRating(5); }}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium"
                >
                  İptal
                </button>
              </div>
            </form>
          )}

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg font-light">Henüz değerlendirme yapılmamış</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.review_id} className="p-6 bg-muted/30 rounded-2xl backdrop-blur-sm border border-border/50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-medium">{review.user_name || "Anonim"}</p>
                      <p className="text-sm text-muted-foreground font-light">
                        {review.created_at ? new Date(review.created_at).toLocaleDateString("tr-TR") : ""}
                      </p>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (review.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mb-4 leading-relaxed font-light">{review.comment}</p>

                  {review.artist_reply && (
                    <div className="ml-6 mt-4 p-4 bg-primary/5 border-l-4 border-primary rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="font-medium text-primary">Sanatçı yanıtı</p>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          Sanatçı
                        </span>
                      </div>
                      {review.artist_reply_date && (
                        <p className="text-sm text-muted-foreground font-light mb-1">
                          {new Date(review.artist_reply_date).toLocaleDateString("tr-TR")}
                        </p>
                      )}
                      <p className="font-light leading-relaxed">{review.artist_reply}</p>
                    </div>
                  )}

                  {/* Sanatçı yanıt formu — Artist rolü ve henüz yanıtlanmamış yorumlar için */}
                  {userRole === "Artist" && !review.artist_reply && (
                    <div className="mt-4">
                      {replyingTo === review.review_id ? (
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
                              onClick={() => handleArtistReply(review.review_id)}
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
                          onClick={() => setReplyingTo(review.review_id)}
                          className="text-sm text-primary hover:underline ml-6"
                        >
                          Yanıt Ver
                        </button>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => toggleHelpful(review.review_id)}
                    className={`flex items-center space-x-2 text-sm transition-colors mt-4 ${
                      helpfulReviews.includes(review.review_id)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${helpfulReviews.includes(review.review_id) ? "fill-current" : ""}`} />
                    <span>Faydalı ({(review.helpful_count ?? 0) + (helpfulReviews.includes(review.review_id) ? 1 : 0)})</span>
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
