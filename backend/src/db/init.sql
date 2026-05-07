-- 1. EXTENSION KURULUMU (UUID için gerekli)
-- Senior Uyarısı: ID'leri 1, 2, 3 diye tahmin edilebilir sayılar yapmak yerine 
-- evrensel olarak benzersiz (UUID) yapıyoruz ki güvenlik açığı oluşmasın.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. KULLANICILAR TABLOSU (Madde 7: Hesap Yönetimi)
CREATE TABLE Users (
    User_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password_Hash VARCHAR(255) NOT NULL, -- Asla düz şifre tutmuyoruz!
    Role VARCHAR(20) CHECK (Role IN ('Customer', 'Admin', 'Artist')) DEFAULT 'Customer',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ER Diyagramına eklemek gerek 
CREATE TABLE Artists (
    Artist_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE SET NULL, -- Opsiyonel: Yaşayan sanatçıysa User ile eşleşir
    Full_Name VARCHAR(150) NOT NULL,
    Biography TEXT,
    Birth_Date DATE,
    Death_Date DATE, -- Picasso için burası dolu olacak
    Nationality VARCHAR(50),
    Artist_Image VARCHAR(255),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- 3. SANAT ESERLERİ TABLOSU (Madde 1: Eserleri İnceleme)
CREATE TABLE Artworks (
  Artwork_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Artist_ID UUID REFERENCES Artists(Artist_ID) ON DELETE CASCADE, -- Artık Artist tablosuna bakıyor
    Title VARCHAR(150) NOT NULL,
    Description TEXT,
    Price NUMERIC(10,2) NOT NULL CHECK (Price >= 0), -- Para birimleri NUMERIC olmalı
    Category VARCHAR(50),
    Image_URL VARCHAR(255),
    Stock_Status VARCHAR(20) DEFAULT 'Available',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ETKİNLİKLER VE ATÖLYELER TABLOSU (Madde 2: Etkinlikleri Görüntüleme) burada iki adet attribute ekledim
CREATE TABLE Events (
    Event_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Organizer_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Title VARCHAR(150) NOT NULL,
    Description TEXT, -- ER ye ekle
    Event_Date TIMESTAMP NOT NULL,
    Capacity INTEGER NOT NULL CHECK (Capacity >= 0), -- Kontenjan eksiye düşemez!
    Price NUMERIC(10,2) NOT NULL CHECK (Price >= 0),
    Image_URL VARCHAR(255), -- ER ye ekle 
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. REZERVASYONLAR TABLOSU (Madde 4, 5, 8: Rezervasyon Oluşturma, Güncelleme, Takip)
CREATE TABLE Reservations (
    Reservation_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Event_ID UUID REFERENCES Events(Event_ID) ON DELETE CASCADE,
    Participant_Count INTEGER NOT NULL CHECK (Participant_Count > 0),
    Total_Price NUMERIC(10,2) NOT NULL, --ER ye ekle
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled')) DEFAULT 'Pending',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. SİPARİŞLER (Fatura) TABLOSU (Madde 6, 8: Satın Alma, Ödeme ve Takip)
CREATE TABLE Orders (
    Order_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Total_Amount NUMERIC(10,2) NOT NULL CHECK (Total_Amount >= 0),
    Payment_Method VARCHAR(50) NOT NULL,
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Completed', 'Refunded')) DEFAULT 'Pending',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. SİPARİŞ KALEMLERİ (Sepet İçi Ürünler) TABLOSU
-- Senior Uyarısı: Sipariş tablosunu şişirmemek için sepet kalemlerini ayırıyoruz.
CREATE TABLE Order_Items (
    Item_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Order_ID UUID REFERENCES Orders(Order_ID) ON DELETE CASCADE,
    Artwork_ID UUID REFERENCES Artworks(Artwork_ID) ON DELETE RESTRICT,
    Price_At_Purchase NUMERIC(10,2) NOT NULL CHECK (Price_At_Purchase >= 0)
);

-- 8. FAVORİLER (Çoka-Çok İlişki Ara Tablosu) (Madde 3: Favorilere Ekleme)
CREATE TABLE Favorites (
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Artwork_ID UUID REFERENCES Artworks(Artwork_ID) ON DELETE CASCADE,
    PRIMARY KEY (User_ID, Artwork_ID) -- Bir kullanıcı aynı eseri iki kez favorileyemez!
);

-- 9. YORUMLAR VE DEĞERLENDİRMELER (Polymorphic Tablo) (Madde 12, 13: Yorum Ekleme ve Değerlendirme)
CREATE TABLE Reviews (
    Review_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Target_ID UUID NOT NULL, -- Artwork_ID veya Event_ID gelecek
    Target_Type VARCHAR(20) CHECK (Target_Type IN ('Artwork', 'Event')) NOT NULL,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5), -- Puanlama 1-5 arası olmalı
    Comment_Text TEXT,
    Helpful_Votes INTEGER DEFAULT 0,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. MÜŞTERİ DESTEK TABLOSU (Madde 10: Müşteri Destek Formu)
CREATE TABLE Support_Tickets (
    Ticket_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Subject VARCHAR(150) NOT NULL,
    Message TEXT NOT NULL,
    Status VARCHAR(20) CHECK (Status IN ('Open', 'Resolved', 'Closed')) DEFAULT 'Open',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. KARŞILAŞTIRMA GEÇMİŞİ (Madde 11: Karşılaştırma Sonuçlarını Kaydetme)
CREATE TABLE Saved_Comparisons (
    Comparison_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Comparison_Type VARCHAR(20) CHECK (Comparison_Type IN ('Artwork', 'Event')) NOT NULL,
    Items_Data JSONB NOT NULL, -- Karşılaştırılan öğelerin ID'leri ve özet verileri burada dizi olarak tutulacak
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);