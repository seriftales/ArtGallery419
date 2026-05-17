import { Link } from "react-router";
import { ArrowRight, Calendar, Star, Sparkles, TrendingUp, Award } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Home() {
  const featuredArtworks = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Renklerin Dansı",
      artist: "Ayşe Demir",
      price: "15000",
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545830384-3a2061eb44ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Düşüncenin Formu",
      artist: "Can Öztürk",
      price: "22000",
      rating: 4.9,
      reviews: 31
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1768212561364-bedf52776510?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Soyut Harmony",
      artist: "Elif Arslan",
      price: "18500",
      rating: 4.7,
      reviews: 19
    }
  ];

  const upcomingWorkshops = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541753866388-0b3c701627d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Yağlı Boya Teknikleri",
      date: "2026-05-20",
      time: "14:00",
      duration: "3 saat",
      price: "450",
      spots: 8,
      maxSpots: 12
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507010444286-828ea71bfac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Suluboya ile Manzara",
      date: "2026-05-22",
      time: "10:00",
      duration: "4 saat",
      price: "380",
      spots: 5,
      maxSpots: 10
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1597274303632-880ef8660375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      title: "Modern Heykel Atölyesi",
      date: "2026-05-25",
      time: "13:00",
      duration: "5 saat",
      price: "600",
      spots: 3,
      maxSpots: 8
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1593103499244-6c882f0163cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="ArtGallery419"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-light tracking-wider">
              Sanatta Yeni Bir Deneyim
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl mb-6 font-light tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              ArtGallery419
            </span>
          </h1>
          <p className="text-xl md:text-3xl mb-12 opacity-90 font-light max-w-3xl mx-auto leading-relaxed">
            Türkiye'nin en seçkin online sanat galerisi ve atölye platformu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/artworks"
              className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 inline-flex items-center justify-center space-x-2 hover:scale-105"
            >
              <span className="font-medium">Eserleri Keşfet</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/workshops"
              className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 inline-flex items-center justify-center space-x-2 hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Atölyelere Katıl</span>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group bg-gradient-to-br from-background via-background to-primary/5 border border-border/50 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-3 font-light bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">250+</div>
              <p className="text-muted-foreground font-light">Sanat Eseri</p>
            </div>
            <div className="group bg-gradient-to-br from-background via-background to-primary/5 border border-border/50 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-3 font-light bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">50+</div>
              <p className="text-muted-foreground font-light">Usta Sanatçı</p>
            </div>
            <div className="group bg-gradient-to-br from-background via-background to-primary/5 border border-border/50 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-3 font-light bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">120+</div>
              <p className="text-muted-foreground font-light">Atölye Etkinliği</p>
            </div>
            <div className="group bg-gradient-to-br from-background via-background to-primary/5 border border-border/50 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-3 font-light bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">3000+</div>
              <p className="text-muted-foreground font-light">Mutlu Müşteri</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-sm text-primary font-medium tracking-wider uppercase">Öne Çıkanlar</span>
              </div>
              <h2 className="text-5xl font-light mb-4">Seçkin Eserler</h2>
              <p className="text-muted-foreground text-lg font-light">En beğenilen ve popüler sanat eserleri</p>
            </div>
            <Link
              to="/artworks"
              className="hidden md:flex items-center space-x-2 text-primary hover:underline group"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork) => (
              <Link
                key={artwork.id}
                to={`/artworks/${artwork.id}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5] bg-muted">
                  <ImageWithFallback
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center space-x-2 text-white">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{artwork.rating} ({artwork.reviews} değerlendirme)</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl mb-2 font-light group-hover:text-primary transition-colors">{artwork.title}</h3>
                <p className="text-muted-foreground mb-2 font-light">{artwork.artist}</p>
                <p className="text-xl font-medium">₺{artwork.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="w-6 h-6 text-primary" />
                <span className="text-sm text-primary font-medium tracking-wider uppercase">Etkinlikler</span>
              </div>
              <h2 className="text-5xl font-light mb-4">Yaklaşan Atölyeler</h2>
              <p className="text-muted-foreground text-lg font-light">Yeteneklerinizi geliştirin, sanatçılarla tanışın</p>
            </div>
            <Link
              to="/workshops"
              className="hidden md:flex items-center space-x-2 text-primary hover:underline group"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingWorkshops.map((workshop) => (
              <Link
                key={workshop.id}
                to={`/workshops/${workshop.id}`}
                className="group bg-background border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    {workshop.spots} Kontenjan
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-3 font-light group-hover:text-primary transition-colors">{workshop.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4 font-light">
                    <p>📅 {new Date(workshop.date).toLocaleDateString('tr-TR')} · {workshop.time}</p>
                    <p>⏱️ {workshop.duration}</p>
                    <p>👥 {workshop.spots}/{workshop.maxSpots} kişi</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <p className="text-2xl font-medium">₺{workshop.price}</p>
                    <span className="text-primary group-hover:underline flex items-center space-x-1">
                      <span>Rezervasyon</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6bS0xMiAwYzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-5xl md:text-6xl mb-6 font-light">Sanat Dolu Bir Yolculuğa Başlayın</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 font-light max-w-2xl mx-auto leading-relaxed">
            Binlerce sanat eserini keşfedin, atölyelere katılın ve sanatçılarla tanışın
          </p>
          <Link
            to="/register"
            className="inline-block px-12 py-5 bg-white text-primary rounded-full hover:shadow-2xl transition-all duration-300 text-lg font-medium hover:scale-105"
          >
            Ücretsiz Üye Ol
          </Link>
        </div>
      </section>
    </div>
  );
}
