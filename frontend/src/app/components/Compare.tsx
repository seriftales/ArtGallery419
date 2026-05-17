import { useState, useEffect } from "react";
import { X, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { api, ApiError } from "../../lib/api";
import { auth } from "../../lib/auth";
import type { ApiList, Artwork } from "../../lib/types";
import { formatPrice, resolveImage } from "../../lib/formatters";

export default function Compare() {
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api.get<ApiList<Artwork>>("/artworks", { skipAuth: true })
      .then((res) => { if (!cancelled) setAllArtworks(res.data); })
      .catch(() => toast.error("Eserler yüklenemedi"))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const selectedItems = allArtworks.filter((a) => selectedIds.includes(a.artwork_id));

  const addToCompare = (id: string) => {
    if (selectedIds.length >= 3) {
      toast.info("En fazla 3 eser karşılaştırabilirsiniz");
      return;
    }
    if (!selectedIds.includes(id)) setSelectedIds([...selectedIds, id]);
  };

  const removeFromCompare = (id: string) => {
    setSelectedIds(selectedIds.filter((x) => x !== id));
  };

  const handleSaveComparison = async () => {
    if (!auth.isLoggedIn()) {
      toast.error("Karşılaştırmayı kaydetmek için giriş yapmalısınız!");
      return;
    }
    if (selectedIds.length < 2) {
      toast.info("Kaydetmek için en az 2 eser seçin");
      return;
    }
    setSaving(true);
    try {
      await api.post("/comparisons/save", {
        comparisonType: "Artwork",
        itemsData: { items: selectedIds },
        title: selectedItems.map((s) => s.title).join(" vs "),
      });
      toast.success("Karşılaştırma kaydedildi!");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Kaydedilemedi";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl mb-4 font-light">Karşılaştır</h1>
        <p className="text-muted-foreground text-lg font-light mb-12">Eserleri yan yana karşılaştırın (en fazla 3 adet)</p>

        {selectedItems.length > 0 && (
          <div className="mb-12 bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
              <h2 className="text-3xl font-light">Karşılaştırma ({selectedItems.length}/3)</h2>
              {selectedItems.length >= 2 && (
                <button
                  onClick={handleSaveComparison}
                  disabled={saving}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm disabled:opacity-60"
                >
                  {saving ? "Kaydediliyor..." : "Karşılaştırmayı Kaydet"}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedItems.map((item) => (
                <div key={item.artwork_id} className="relative">
                  <button onClick={() => removeFromCompare(item.artwork_id)} className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">
                    <X className="w-4 h-4" />
                  </button>
                  <ImageWithFallback src={resolveImage(item.image_url)} alt={item.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
                  <h3 className="text-lg mb-2 font-light">{item.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground font-light">Sanatçı</span>
                      <span>{item.artist_name || "-"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground font-light">Fiyat</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                    {item.category && (
                      <div className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-muted-foreground font-light">Kategori</span>
                        <span>{item.category}</span>
                      </div>
                    )}
                    {(item.like_count ?? 0) > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground font-light">Beğeni</span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{item.like_count}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {selectedItems.length < 3 && (
                <div className="border-2 border-dashed border-border/50 rounded-2xl h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Plus className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-light">Aşağıdan eser ekleyin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-light mb-6">Eserler</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-muted rounded-2xl h-80" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArtworks.map((item) => {
              const isSelected = selectedIds.includes(item.artwork_id);
              return (
                <div key={item.artwork_id} className="bg-background border border-border/50 rounded-2xl overflow-hidden">
                  <ImageWithFallback src={resolveImage(item.image_url)} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-lg mb-2 font-light">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-light">{item.artist_name || "-"}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium">{formatPrice(item.price)}</span>
                      {(item.like_count ?? 0) > 0 && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{item.like_count}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => addToCompare(item.artwork_id)}
                      disabled={selectedIds.length >= 3 || isSelected}
                      className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isSelected ? "Seçildi" : "Karşılaştır"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
