import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, Clock, Users, Search, SlidersHorizontal, Star, MapPin, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const WORKSHOPS_DATA = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Yağlı Boya Teknikleri",
    instructor: "Ayşe Demir",
    description: "Klasik ve modern yağlı boya tekniklerini öğrenin",
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
    location: "Kadıköy Atölyesi"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507010444286-828ea71bfac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Suluboya ile Manzara",
    instructor: "Mehmet Yılmaz",
    description: "Suluboya teknikleriyle etkileyici manzaralar yaratın",
    date: "2026-05-22",
    time: "10:00",
    duration: "4 saat",
    price: 380,
    spots: 5,
    maxSpots: 10,
    level: "Orta",
    category: "Resim",
    rating: 4.7,
    reviews: 32,
    location: "Beşiktaş Atölyesi"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1597274303632-880ef8660375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Modern Heykel Atölyesi",
    instructor: "Can Öztürk",
    description: "Çağdaş heykel sanatının temellerini keşfedin",
    date: "2026-05-25",
    time: "13:00",
    duration: "5 saat",
    price: 600,
    spots: 3,
    maxSpots: 8,
    level: "İleri",
    category: "Heykel",
    rating: 4.8,
    reviews: 28,
    location: "Kadıköy Atölyesi"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Portre Çizimi",
    instructor: "Zeynep Kaya",
    description: "İnsan yüzü anatomisi ve portre teknikleri",
    date: "2026-05-27",
    time: "15:00",
    duration: "4 saat",
    price: 420,
    spots: 6,
    maxSpots: 10,
    level: "Orta",
    category: "Resim",
    rating: 4.9,
    reviews: 38,
    location: "Beşiktaş Atölyesi"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1578926078187-398f3a3e4a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Seramik Sanatı",
    instructor: "Elif Yıldız",
    description: "Çömlekçi çarkı ile seramik yapımı",
    date: "2026-05-29",
    time: "11:00",
    duration: "6 saat",
    price: 550,
    spots: 4,
    maxSpots: 8,
    level: "Başlangıç",
    category: "Seramik",
    rating: 4.8,
    reviews: 42,
    location: "Kadıköy Atölyesi"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Dijital Fotoğraf",
    instructor: "Murat Demir",
    description: "DSLR kamera kullanımı ve kompozisyon",
    date: "2026-06-01",
    time: "09:00",
    duration: "5 saat",
    price: 480,
    spots: 7,
    maxSpots: 12,
    level: "Başlangıç",
    category: "Fotoğraf",
    rating: 4.7,
    reviews: 36,
    location: "Beşiktaş Atölyesi"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Akrilik Soyut Sanat",
    instructor: "Ayşe Demir",
    description: "Soyut resim teknikleri ve renk teorisi",
    date: "2026-06-03",
    time: "13:00",
    duration: "4 saat",
    price: 460,
    spots: 9,
    maxSpots: 12,
    level: "Orta",
    category: "Resim",
    rating: 4.8,
    reviews: 29,
    location: "Kadıköy Atölyesi"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "Kaligrafi Sanatı",
    instructor: "Hasan Yılmaz",
    description: "Geleneksel hat sanatı ve modern kaligrafi",
    date: "2026-06-05",
    time: "14:00",
    duration: "3 saat",
    price: 320,
    spots: 10,
    maxSpots: 15,
    level: "Başlangıç",
    category: "Resim",
    rating: 4.9,
    reviews: 51,
    location: "Beşiktaş Atölyesi"
  }
];

export default function WorkshopList() {
  const [workshops] = useState(WORKSHOPS_DATA);
  const [filteredWorkshops, setFilteredWorkshops] = useState(WORKSHOPS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Apply filters
  useEffect(() => {
    let filtered = [...workshops];

    if (searchTerm) {
      filtered = filtered.filter(w =>
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter(w => w.level === selectedLevel);
    }

    if (priceRange !== "all") {
      if (priceRange === "0-300") {
        filtered = filtered.filter(w => w.price <= 300);
      } else if (priceRange === "300-500") {
        filtered = filtered.filter(w => w.price > 300 && w.price <= 500);
      } else if (priceRange === "500+") {
        filtered = filtered.filter(w => w.price > 500);
      }
    }

    setFilteredWorkshops(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, priceRange, workshops]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedLevel("all");
    setPriceRange("all");
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
          <p className="text-muted-foreground text-lg font-light">{filteredWorkshops.length} atölye bulundu</p>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-light">Kategori</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">Tümü</option>
                    <option value="Resim">Resim</option>
                    <option value="Heykel">Heykel</option>
                    <option value="Seramik">Seramik</option>
                    <option value="Fotoğraf">Fotoğraf</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-light">Seviye</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">Tümü</option>
                    <option value="Başlangıç">Başlangıç</option>
                    <option value="Orta">Orta</option>
                    <option value="İleri">İleri</option>
                  </select>
                </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredWorkshops.map((workshop) => (
            <Link
              key={workshop.id}
              to={`/workshops/${workshop.id}`}
              className="group bg-background border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                  {workshop.spots} Kontenjan
                </div>
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {workshop.level}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-3 font-light group-hover:text-primary transition-colors">{workshop.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 font-light line-clamp-2">{workshop.description}</p>

                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <p className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(workshop.date).toLocaleDateString('tr-TR')} · {workshop.time}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{workshop.duration}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{workshop.spots}/{workshop.maxSpots} kişi</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{workshop.location}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="text-2xl font-medium">₺{workshop.price}</div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{workshop.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
