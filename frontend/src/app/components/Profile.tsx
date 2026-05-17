import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Lock, Save, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.getUser());
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "" });
  const [pwData, setPwData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      navigate("/login");
      return;
    }
    const u = auth.getUser();
    if (u) {
      // user.name yalnızca firstName tutuyor olabilir
      const parts = (u.name || "").trim().split(/\s+/);
      setFormData({
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" "),
        email: u.email || "",
      });
    }
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await api.patch("/user/profile", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      // localStorage user'ı güncelle
      const updated = { ...(user || { id: "", role: "" }), name: formData.firstName, email: formData.email };
      auth.setUser(updated as any);
      setUser(updated as any);
      toast.success("Profil bilgileriniz başarıyla güncellendi!");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Güncelleme başarısız";
      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwData.newPassword !== pwData.confirmPassword) {
      toast.error("Yeni şifreler eşleşmiyor");
      return;
    }
    if (pwData.newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter olmalı");
      return;
    }
    setSavingPw(true);
    try {
      await api.put("/user/change-password", {
        oldPassword: pwData.oldPassword,
        newPassword: pwData.newPassword,
      });
      setPwData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Şifreniz başarıyla değiştirildi!");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Şifre değiştirilemedi";
      toast.error(message);
    } finally {
      setSavingPw(false);
    }
  };

  if (!user) return null;

  const roleLabel =
    user.role === "Admin" ? "⚙️ Admin" :
    user.role === "Artist" ? "🎨 Sanatçı" : "👤 Kullanıcı";

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-10 h-10 text-primary" />
            <h1 className="text-6xl font-light">Profil Ayarları</h1>
          </div>
          <p className="text-muted-foreground text-lg font-light">Hesap bilgilerinizi yönetin</p>
        </div>

        {/* Profil Bilgileri */}
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-3xl mb-6 font-light">Profil Bilgileri</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-light text-sm">Ad</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-light text-sm">Soyad</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 font-light text-sm">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              </div>
            </div>

            <button type="submit" disabled={savingProfile} className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 flex items-center space-x-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed">
              <Save className="w-5 h-5" />
              <span>{savingProfile ? "Kaydediliyor..." : "Bilgileri Güncelle"}</span>
            </button>
          </form>
        </div>

        {/* Şifre Değiştirme */}
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-3xl mb-6 font-light flex items-center space-x-2">
            <KeyRound className="w-7 h-7" />
            <span>Şifre Değiştirme</span>
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-5">
            <div>
              <label className="block mb-2 font-light text-sm">Mevcut Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="password" value={pwData.oldPassword} onChange={(e) => setPwData({ ...pwData, oldPassword: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-light text-sm">Yeni Şifre</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="password" value={pwData.newPassword} onChange={(e) => setPwData({ ...pwData, newPassword: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required minLength={6} />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-light text-sm">Yeni Şifre Tekrar</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="password" value={pwData.confirmPassword} onChange={(e) => setPwData({ ...pwData, confirmPassword: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required minLength={6} />
              </div>
            </div>
            <button type="submit" disabled={savingPw} className="px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl hover:bg-secondary/80 transition-all duration-300 flex items-center space-x-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed">
              <KeyRound className="w-5 h-5" />
              <span>{savingPw ? "Değiştiriliyor..." : "Şifreyi Değiştir"}</span>
            </button>
          </form>
        </div>

        {/* Hesap Türü */}
        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl mb-4 font-light">Hesap Türü</h2>
          <div className="p-4 bg-primary/10 rounded-2xl">
            <p className="font-medium">{roleLabel}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
