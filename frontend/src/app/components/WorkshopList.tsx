import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, Users, Search, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { api } from "../../lib/api";
import type { ApiList, ArtEvent } from "../../lib/types";
import { parsePrice, formatPrice, resolveImage } from "../../lib/formatters";

export default function WorkshopList() {
  const [workshops, setWorkshops] = useState<ArtEvent[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<ArtEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date-asc");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await api.get<ApiList<ArtEvent>>("/events", { skipAuth: true });
        if (cancelled) return;
        setWorkshops(res.data);
      } catch (err) {
        console.error("Atölyeler yüklenemedi:", err);
        toast.error("Atölyeler yüklenemedi");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let filtered = [...workshops];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          (w.description?.toLowerCase().includes(q) ?? false)
      );
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((w) => {
        const p = parsePrice(w.price);
        if (priceRange === "0-300") return p <= 300;
        if (priceRange === "300-500") return p > 300 && p <= 500;
        if (priceRange === "500+") return p > 500;
        return true;
      });
    }

    if (sortBy === "date-asc") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === "date-desc") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "price-low") {
      filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    setFilteredWorkshops(filtered);
  }, [searchTerm, priceRange, sortBy, workshops]);

  const resetFilters = () => {
    setPriceRange("all");
    setSortBy("date-asc");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-10 h-10 text-primary" />
            <h1 className="text-6xl font-light">Atölye ve Etkinlikler</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">
            {loading ? "Yükleniyor..." : `${filteredWorkshops.length} atölye bulundu`}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Atölye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-all"
            >
              <SlidersHorizontal className="w-5 h-5 inline mr-2" />
              Filtreler
            </button>
          </div>

          {showFilters && (
            <div className="bg-muted/30 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-light">Filtreler</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-light">Fiyat Aralığı</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">Tümü</option>
                    <option value="0-300">₺0 - ₺300</option>
                    <option value="300-500">₺300 - ₺500</option>
                    <option value="500+">₺500+</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-light">Sıralama</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="date-asc">Tarih (Yakın → Uzak)</option>
                    <option value="date-desc">Tarih (Uzak → Yakın)</option>
                    <option value="price-low">Fiyat (Düşük)</option>
                    <option value="price-high">Fiyat (Yüksek)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-all"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-background border border-border/50 rounded-2xl overflow-hidden">
                <div className="h-64 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredWorkshops.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-muted-foreground mb-4 font-light">Atölye bulunamadı</p>
            <p className="text-muted-foreground font-light">Lütfen farklı filtreler deneyin</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredWorkshops.map((workshop) => (
              <Link
                key={workshop.event_id}
                to={`/workshops/${workshop.event_id}`}
                className="group bg-background border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={resolveImage(workshop.image_url, "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?w=800")}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    {workshop.capacity} Kontenjan
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl mb-3 font-light group-hover:text-primary transition-colors">{workshop.title}</h3>
                  {workshop.description && (
                    <p className="text-sm text-muted-foreground mb-4 font-light line-clamp-2">{workshop.description}</p>
                  )}

                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <p className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(workshop.date).toLocaleDateString("tr-TR")}
                        {workshop.time ? ` · ${workshop.time.slice(0, 5)}` : ""}
                      </span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{workshop.capacity} kişi kapasite</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-2xl font-medium">{formatPrice(workshop.price)}</div>
                    <span className="text-primary group-hover:underline text-sm">Detay →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
