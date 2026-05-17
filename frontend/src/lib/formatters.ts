// Backend'den gelen price string'lerini (ör. "50000.00") sayıya çevirir
export const parsePrice = (price: string | number | null | undefined): number => {
  if (price === null || price === undefined) return 0;
  const n = typeof price === "string" ? parseFloat(price) : price;
  return isNaN(n) ? 0 : n;
};

// "₺50.000" gibi okunabilir biçim
export const formatPrice = (price: string | number | null | undefined): string => {
  return `₺${parsePrice(price).toLocaleString("tr-TR")}`;
};

// Resim yoksa Unsplash placeholder döner
export const resolveImage = (imageUrl: string | null | undefined, fallback?: string): string => {
  if (imageUrl && imageUrl.trim() !== "") {
    // Backend göreceli yol döndürebilir (ör. /uploads/...)
    if (imageUrl.startsWith("http")) return imageUrl;
    const apiBase = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") || "http://localhost:5005";
    return `${apiBase}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  }
  return fallback || "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800";
};
