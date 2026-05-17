import { useState } from "react";
import { X, Plus, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const ARTWORKS_DATA = [
  { id: 1, image: "https://images.unsplash.com/photo-1606819717115-9159c900370b?w=800", title: "Renklerin Dansı", artist: "Ayşe Demir", category: "Yağlı Boya", price: 15000, year: 2024, size: "100x80 cm", rating: 4.8, reviews: 24 },
  { id: 2, image: "https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?w=800", title: "Sessiz Anlar", artist: "Mehmet Yılmaz", category: "Akrilik", price: 12500, year: 2023, size: "90x70 cm", rating: 4.6, reviews: 18 }
];

export default function Compare() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const addToCompare = (item: any) => {
    if (selectedItems.length < 3 && !selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeFromCompare = (itemId: number) => {
    setSelectedItems(selectedItems.filter(i => i.id !== itemId));
  };

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl mb-4 font-light">Karşılaştır</h1>
        <p className="text-muted-foreground text-lg font-light mb-12">Eserleri yan yana karşılaştırın</p>

        {selectedItems.length > 0 && (
          <div className="mb-12 bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-light">Karşılaştırma ({selectedItems.length}/3)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedItems.map((item) => (
                <div key={item.id} className="relative">
                  <button onClick={() => removeFromCompare(item.id)} className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white">
                    <X className="w-4 h-4" />
                  </button>
                  <ImageWithFallback src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
                  <h3 className="text-lg mb-2 font-light">{item.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground font-light">Sanatçı</span>
                      <span>{item.artist}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground font-light">Fiyat</span>
                      <span>₺{item.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground font-light">Puan</span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {selectedItems.length < 3 && (
                <div className="border-2 border-dashed border-border/50 rounded-2xl h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Plus className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-light">Karşılaştır</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTWORKS_DATA.map((item) => (
            <div key={item.id} className="bg-background border border-border/50 rounded-2xl overflow-hidden">
              <ImageWithFallback src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg mb-2 font-light">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 font-light">{item.artist}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">₺{item.price.toLocaleString()}</span>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <button onClick={() => addToCompare(item)} disabled={selectedItems.length >= 3 || selectedItems.find(i => i.id === item.id) !== undefined} className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">
                  {selectedItems.find(i => i.id === item.id) ? "Seçildi" : "Karşılaştır"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
