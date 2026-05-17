import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Phone, Lock, Save } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!storedUser.email) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    setFormData({ name: storedUser.name || "", email: storedUser.email || "", phone: storedUser.phone || "" });
  }, [navigate]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...formData };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(users[userIndex]));
      setUser(users[userIndex]);
      setMessage("Profil bilgileriniz başarıyla güncellendi!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!user) return null;

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

        {message && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 text-green-600 rounded-2xl">{message}</div>
        )}

        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8 mb-6">
          <h2 className="text-3xl mb-6 font-light">Profil Bilgileri</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-5">
            <div>
              <label className="block mb-2 font-light text-sm">Ad Soyad</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-light text-sm">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-light text-sm">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            <button type="submit" className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 flex items-center space-x-2 font-medium">
              <Save className="w-5 h-5" />
              <span>Bilgileri Güncelle</span>
            </button>
          </form>
        </div>

        <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl mb-4 font-light">Hesap Türü</h2>
          <div className="p-4 bg-primary/10 rounded-2xl">
            <p className="font-medium">{user.role === "admin" ? "⚙️ Admin" : user.role === "artist" ? "🎨 Sanatçı" : "👤 Kullanıcı"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
