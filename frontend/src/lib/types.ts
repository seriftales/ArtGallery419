// Backend response tipleri.
// Backend yanıtları genelde { success, data } veya { success, count, data } formatında.

export interface ApiList<T> {
  success: boolean;
  count?: number;
  data: T[];
}

export interface ApiItem<T> {
  success: boolean;
  data: T;
}

// /api/artworks ve /api/artworks/campaigns yanıtlarındaki eser tipi
export interface Artwork {
  artwork_id: string;
  artist_id?: string;
  title: string;
  description: string | null;
  price: string; // backend "50000.00" gibi string döndürüyor
  category: string | null;
  image_url: string | null;
  stock_status: "Available" | "Sold" | "Reserved" | string;
  artist_name?: string;
  view_count?: number;
  like_count?: number;
  is_campaign?: boolean;
  campaign_discount_percent?: number;
  created_at?: string;
}

// /api/events yanıtındaki etkinlik tipi
export interface ArtEvent {
  event_id: string;
  title: string;
  description: string | null;
  capacity: number;
  price: string;
  image_url: string | null;
  date: string;
  time: string;
}

// /api/reviews/:targetId yanıtındaki yorum tipi (backend dokümantasyonu netleşene kadar esnek tutalım)
export interface Review {
  review_id: string;
  user_id: string;
  target_id: string;
  rating: number;
  comment: string;
  helpful_count?: number;
  artist_reply?: string | null;
  artist_reply_date?: string | null;
  created_at: string;
  user_name?: string;
}
