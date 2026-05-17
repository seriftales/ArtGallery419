import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

// Backend /api/auth/login response tipi
interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    firstName: string;
    role: "Customer" | "Admin" | "Artist" | string;
  };
}

export default function Login({ setIsLoggedIn }: LoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await api.post<LoginResponse>(
        "/auth/login",
        { email: formData.email, password: formData.password },
        { skipAuth: true }
      );

      // Token ve kullanıcıyı kaydet
      auth.setToken(data.token);
      auth.setUser({
        id: data.user.id,
        name: data.user.firstName,
        email: formData.email,
        role: data.user.role,
      });

      setIsLoggedIn(true);
      toast.success(`Hoş geldiniz, ${data.user.firstName}!`);

      // Role göre yönlendirme (backend "Customer"/"Admin"/"Artist" döndürüyor)
      if (data.user.role === "Admin") {
        navigate("/admin");
      } else if (data.user.role === "Artist") {
        navigate("/artist/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Sunucuya bağlanılamadı";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
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
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
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
          <p className="mb-4 font-medium text-foreground">Test Hesabı:</p>
          <div className="space-y-3">
            <div className="p-3 bg-background/50 rounded-xl">
              <p className="font-medium text-foreground mb-1">👤 Kullanıcı</p>
              <p className="text-muted-foreground">test@test.com / test123</p>
            </div>
            <div className="p-3 bg-background/50 rounded-xl">
              <p className="text-muted-foreground text-xs">
                Yeni hesap için "Kayıt Olun" bağlantısını kullanabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
