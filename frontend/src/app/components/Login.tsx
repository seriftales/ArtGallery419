import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    // Demo hesaplar
    const demoAccounts = [
      { email: "user@artgallery419.com", password: "user123", role: "user", name: "Demo Kullanıcı" },
      { email: "artist@artgallery419.com", password: "artist123", role: "artist", name: "Ayşe Demir" },
      { email: "admin@artgallery419.com", password: "admin123", role: "admin", name: "Demo Admin" }
    ];

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find(
      (u: any) => u.email === formData.email && u.password === formData.password
    );

    // Demo hesap kontrolü
    if (!user) {
      user = demoAccounts.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
      toast.success(`Hoş geldiniz, ${user.name}!`);

      // Role göre yönlendirme
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "artist") {
        navigate("/artist/dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error("E-posta veya şifre hatalı");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl mb-6 relative">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
            <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-3 font-light">Hoş Geldiniz</h1>
          <p className="text-muted-foreground font-light">ArtGallery419'a giriş yapın</p>
        </div>

        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-light text-sm">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-light text-sm">Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-14 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] font-medium"
            >
              Giriş Yap
            </button>

            <div className="text-center pt-4">
              <p className="text-muted-foreground font-light">
                Hesabınız yok mu?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Kayıt Olun
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-6 p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl text-sm">
          <p className="mb-4 font-medium text-foreground">Demo Hesaplar:</p>
          <div className="space-y-3">
            <div className="p-3 bg-background/50 rounded-xl">
              <p className="font-medium text-foreground mb-1">👤 Kullanıcı</p>
              <p className="text-muted-foreground">user@artgallery419.com / user123</p>
            </div>
            <div className="p-3 bg-background/50 rounded-xl">
              <p className="font-medium text-foreground mb-1">🎨 Sanatçı (Ayşe Demir)</p>
              <p className="text-muted-foreground">artist@artgallery419.com / artist123</p>
            </div>
            <div className="p-3 bg-background/50 rounded-xl">
              <p className="font-medium text-foreground mb-1">⚙️ Admin</p>
              <p className="text-muted-foreground">admin@artgallery419.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
