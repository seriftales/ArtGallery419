import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";

const SUBJECT_LABELS: Record<string, string> = {
  general: "Genel Bilgi",
  artwork: "Eserler Hakkında",
  workshop: "Atölye Hakkında",
  reservation: "Rezervasyon Sorunu",
};

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isLoggedIn()) {
      toast.error("Destek talebi göndermek için giriş yapmalısınız!");
      navigate("/login");
      return;
    }
    setSubmitting(true);
    try {
      const subjectText = SUBJECT_LABELS[formData.subject] || formData.subject;
      await api.post("/tickets", {
        subject: `${subjectText} - ${formData.name}`,
        message: `${formData.message}\n\n---\nİletişim: ${formData.email}${formData.phone ? " / " + formData.phone : ""}`,
      });
      toast.success("Mesajınız başarıyla gönderildi!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Mesaj gönderilemedi";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl mb-4 font-light">İletişim</h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-xl p-6">
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2 font-light">Adres</h3>
                  <p className="text-muted-foreground font-light">Nişantaşı Mahallesi<br />Teşvikiye Caddesi No: 45<br />Şişli, İstanbul 34365</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-6">
                <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2 font-light">Çalışma Saatleri</h3>
                  <p className="text-muted-foreground font-light">Pazartesi - Cuma: 09:00 - 18:00<br />Cumartesi: 10:00 - 16:00<br />Pazar: Kapalı</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-6">
                <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2 font-light">Telefon</h3>
                  <p className="text-muted-foreground font-light">+90 212 555 0419</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2 font-light">E-posta</h3>
                  <p className="text-muted-foreground font-light">info@artgallery419.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl mb-6 font-light">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-light text-sm">Ad Soyad *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                  </div>
                  <div>
                    <label className="block mb-2 font-light text-sm">E-posta *</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-light text-sm">Telefon</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block mb-2 font-light text-sm">Konu *</label>
                    <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" required>
                      <option value="">Seçiniz</option>
                      <option value="general">Genel Bilgi</option>
                      <option value="artwork">Eserler Hakkında</option>
                      <option value="workshop">Atölye Hakkında</option>
                      <option value="reservation">Rezervasyon Sorunu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 font-light text-sm">Mesajınız *</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={6} className="w-full px-4 py-4 bg-muted/50 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Mesajınızı buraya yazın..." required />
                </div>
                <button type="submit" disabled={submitting} className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 flex items-center space-x-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                  <Send className="w-5 h-5" />
                  <span>{submitting ? "Gönderiliyor..." : "Mesajı Gönder"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
