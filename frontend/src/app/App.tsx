import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X, Heart, User, Calendar, Sparkles } from "lucide-react";
import { Toaster } from "sonner";
import Home from "./components/Home";
import ArtworkGallery from "./components/ArtworkGallery";
import WorkshopList from "./components/WorkshopList";
import WorkshopDetail from "./components/WorkshopDetail";
import ArtworkDetail from "./components/ArtworkDetail";
import Favorites from "./components/Favorites";
import MyReservations from "./components/MyReservations";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Compare from "./components/Compare";
import Contact from "./components/Contact";
import AdminDashboard from "./components/AdminDashboard";
import ArtistDashboard from "./components/ArtistDashboard";

function Navigation({ isLoggedIn, setIsLoggedIn, favoritesCount }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUserRole(userData.role);
    } else {
      setUserRole(null);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-300" />
            </div>
            <h1 className="text-2xl md:text-3xl font-light tracking-wider bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              ArtGallery419
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Admin: Sadece Admin Paneli */}
            {userRole === 'Admin' ? (
              <Link
                to="/admin"
                className={`relative py-2 transition-all duration-300 ${
                  isActive('/admin') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                }`}
              >
                <span>Admin Paneli</span>
                {isActive('/admin') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                )}
              </Link>
            ) : (
              <>
                {/* User & Artist: Normal navigation */}
                <Link
                  to="/"
                  className={`relative py-2 transition-all duration-300 ${
                    isActive('/') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  <span>Ana Sayfa</span>
                  {isActive('/') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                  )}
                </Link>
                <Link
                  to="/artworks"
                  className={`relative py-2 transition-all duration-300 ${
                    isActive('/artworks') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  <span>Eserler</span>
                  {isActive('/artworks') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                  )}
                </Link>
                <Link
                  to="/workshops"
                  className={`relative py-2 transition-all duration-300 ${
                    isActive('/workshops') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  <span>Atölyeler</span>
                  {isActive('/workshops') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                  )}
                </Link>
                <Link
                  to="/compare"
                  className={`relative py-2 transition-all duration-300 ${
                    isActive('/compare') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  <span>Karşılaştır</span>
                  {isActive('/compare') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                  )}
                </Link>
                <Link
                  to="/contact"
                  className={`relative py-2 transition-all duration-300 ${
                    isActive('/contact') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  <span>İletişim</span>
                  {isActive('/contact') && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                  )}
                </Link>

                {/* Artist: Sanatçı Paneli */}
                {userRole === 'Artist' && (
                  <Link
                    to="/artist/dashboard"
                    className={`relative py-2 transition-all duration-300 ${
                      isActive('/artist/dashboard') ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                    }`}
                  >
                    <span>Sanatçı Paneli</span>
                    {isActive('/artist/dashboard') && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                    )}
                  </Link>
                )}
              </>
            )}

            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-border/50">
              {/* Admin: Profil + Çıkış */}
              {userRole === 'Admin' ? (
                <>
                  <Link to="/profile" className="p-2 hover:bg-accent rounded-full transition-all duration-300 group">
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Çıkış
                  </button>
                </>
              ) : (
                <>
                  {/* User & Artist: Favoriler */}
                  {isLoggedIn ? (
                    <Link to="/favorites" className="relative p-2 hover:bg-accent rounded-full transition-all duration-300 group">
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      {favoritesCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-lg animate-pulse">
                          {favoritesCount}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <Link to="/login" className="relative p-2 hover:bg-accent rounded-full transition-all duration-300 group opacity-60" title="Favoriler için giriş yapın">
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  )}

                  {/* User & Artist: Rezervasyon, Profil, Çıkış */}
                  {isLoggedIn ? (
                    <>
                      <Link to="/my-reservations" className="p-2 hover:bg-accent rounded-full transition-all duration-300 group">
                        <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Link>
                      <Link to="/profile" className="p-2 hover:bg-accent rounded-full transition-all duration-300 group">
                        <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-5 py-2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Çıkış
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
                    >
                      Giriş Yap
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-3 bg-background/95 backdrop-blur-xl border-t border-border">
            {/* Admin: Admin Paneli + Profil + Çıkış */}
            {userRole === 'Admin' ? (
              <>
                <Link to="/admin" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors bg-primary/10">Admin Paneli</Link>
                <Link to="/profile" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">Profilim</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                {/* User & Artist: Normal navigation */}
                <Link to="/" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">Ana Sayfa</Link>
                <Link to="/artworks" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">Eserler</Link>
                <Link to="/workshops" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">Atölyeler</Link>
                <Link to="/compare" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">Karşılaştır</Link>
                <Link to="/contact" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">İletişim</Link>

                {userRole === 'Artist' && (
                  <Link to="/artist/dashboard" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors bg-primary/10">Sanatçı Paneli</Link>
                )}

                {/* User & Artist: Favoriler, Rezervasyon, Profil */}
                {isLoggedIn ? (
                  <>
                    <Link to="/favorites" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">
                      Favorilerim ({favoritesCount})
                    </Link>
                    <Link to="/my-reservations" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">Rezervasyonlarım</Link>
                    <Link to="/profile" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors">Profilim</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 px-4 rounded-lg hover:bg-accent transition-colors"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block py-2 px-4 rounded-lg hover:bg-accent transition-colors opacity-60">
                      Favoriler (Giriş gerekli)
                    </Link>
                    <Link to="/login" className="block py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Giriş Yap</Link>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoritesCount(favorites.length);

    const handleStorageChange = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoritesCount(favorites.length);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favoritesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <div className="size-full bg-background overflow-auto">
        <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} favoritesCount={favoritesCount} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artworks" element={<ArtworkGallery />} />
          <Route path="/artworks/:id" element={<ArtworkDetail />} />
          <Route path="/workshops" element={<WorkshopList />} />
          <Route path="/workshops/:id" element={<WorkshopDetail isLoggedIn={isLoggedIn} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/my-reservations" element={<MyReservations isLoggedIn={isLoggedIn} />} />
          <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard isLoggedIn={isLoggedIn} />} />
          <Route path="/artist/dashboard" element={<ArtistDashboard isLoggedIn={isLoggedIn} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
