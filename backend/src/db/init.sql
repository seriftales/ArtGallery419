-- 1. EXTENSION KURULUMU (UUID için gerekli)
-- UUID benzersiz kimlikler oluşturmak için kullanılır, bu da veritabanında çakışmaları önler ve güvenliği artırır.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. KULLANICILAR TABLOSU 
CREATE TABLE Users (
    User_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password_Hash VARCHAR(255) NOT NULL, 
    Role VARCHAR(20) CHECK (Role IN ('Customer', 'Admin', 'Artist')) DEFAULT 'Customer',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. SANATÇILAR TABLOSU (ER Diyagramına eklemek gerek) 
CREATE TABLE Artists (
    Artist_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE SET NULL, 
    Full_Name VARCHAR(150) NOT NULL,
    Biography TEXT,
    Birth_Date DATE,
    Death_Date DATE, 
    Nationality VARCHAR(50),
    Artist_Image VARCHAR(255),
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. SANAT ESERLERİ TABLOSU 
CREATE TABLE Artworks (
    Artwork_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Artist_ID UUID REFERENCES Artists(Artist_ID) ON DELETE CASCADE, 
    Title VARCHAR(150) NOT NULL,
    Description TEXT,
    Price NUMERIC(10,2) NOT NULL CHECK (Price >= 0), 
    Category VARCHAR(50),
    Image_URL VARCHAR(255),
    Stock_Status VARCHAR(20) DEFAULT 'Available',
    View_Count INT DEFAULT 0, --ER ye ekle: Eserin kaç kez görüntülendiğini takip etmek için
    Like_Count INT DEFAULT 0; --ER ye ekle: Eserin kaç kez beğenildiğini takip etmek için
    Is_Campaign BOOLEAN DEFAULT FALSE, --ER ye ekle: Kampanyalı eserleri işaretlemek için
    Campaign_Discount_Percent INT DEFAULT 0;--ER ye ekle: Kampanya varsa indirim yüzdesi
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ETKİNLİKLER VE ATÖLYELER TABLOSU m
CREATE TABLE Events (
    Event_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Organizer_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Title VARCHAR(150) NOT NULL,
    Description TEXT, -- ER ye ekle. Etkinlik detayları için açıklama alanı
    Event_Date TIMESTAMP NOT NULL,
    Capacity INTEGER NOT NULL CHECK (Capacity >= 0), 
    Price NUMERIC(10,2) NOT NULL CHECK (Price >= 0),
    Image_URL VARCHAR(255), -- ER ye ekle. Etkinlik görseli için URL 
    View_Count INT DEFAULT 0, --ER ye ekle: Eserin kaç kez görüntülendiğini takip etmek için
    Is_Campaign BOOLEAN DEFAULT FALSE, --ER ye ekle: Kampanyalı etkinlikleri işaretlemek için
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. REZERVASYONLAR TABLOSU 
CREATE TABLE Reservations (
    Reservation_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Event_ID UUID REFERENCES Events(Event_ID) ON DELETE CASCADE,
    Participant_Count INTEGER NOT NULL CHECK (Participant_Count > 0),
    Total_Price NUMERIC(10,2) NOT NULL, --ER ye ekle. Rezervasyonun toplam fiyatını tutmak için alan
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled')) DEFAULT 'Pending',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. SİPARİŞLER TABLOSU 
CREATE TABLE Orders (
    Order_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Total_Amount NUMERIC(10,2) NOT NULL CHECK (Total_Amount >= 0),
    Payment_Method VARCHAR(50) NOT NULL,
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Completed', 'Refunded')) DEFAULT 'Pending',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. SİPARİŞ KALEMLERİ (Sepet İçi Ürünler) TABLOSU
CREATE TABLE Order_Items (
    Item_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Order_ID UUID REFERENCES Orders(Order_ID) ON DELETE CASCADE,
    Artwork_ID UUID REFERENCES Artworks(Artwork_ID) ON DELETE RESTRICT,
    Price_At_Purchase NUMERIC(10,2) NOT NULL CHECK (Price_At_Purchase >= 0)
);

-- 8. FAVORİLER 
CREATE TABLE Favorites (
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Artwork_ID UUID REFERENCES Artworks(Artwork_ID) ON DELETE CASCADE,
    PRIMARY KEY (User_ID, Artwork_ID) 
);

-- 9. YORUMLAR VE DEĞERLENDİRMELER 
CREATE TABLE Reviews (
    Review_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Target_ID UUID NOT NULL, -- Artwork_ID veya Event_ID 
    Target_Type VARCHAR(20) CHECK (Target_Type IN ('Artwork', 'Event')) NOT NULL,
    Rating INTEGER CHECK (Rating >= 1 AND Rating <= 5), 
    Comment_Text TEXT,
    Reply_Text TEXT;--ER ye ekle: Sanatçı veya organizatörün yoruma vereceği cevap için alan
    Replied_At TIMESTAMP;--ER ye ekle: Cevap verildiği zamanı tutmak için alan
    Helpful_Votes INTEGER DEFAULT 0,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. MÜŞTERİ DESTEK TABLOSU 
CREATE TABLE Support_Tickets (
    Ticket_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Subject VARCHAR(150) NOT NULL,
    Message TEXT NOT NULL, --ER Den cıkar 
    Status VARCHAR(20) CHECK (Status IN ('Open', 'Resolved', 'Closed')) DEFAULT 'Open',
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. KARŞILAŞTIRMA GEÇMİŞİ 
CREATE TABLE Saved_Comparisons (
    Comparison_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE,
    Comparison_Type VARCHAR(20) CHECK (Comparison_Type IN ('Artwork', 'Event')) NOT NULL,
    Items_Data JSONB NOT NULL, 
    Title VARCHAR(100), -- ER ye ekle: Kullanıcı karşılaştırmaya bir başlık verebilir
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. KUPONLAR TABLOSU ( ER ye ekle )
CREATE TABLE Coupons (
    Coupon_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Code VARCHAR(20) UNIQUE NOT NULL, 
    Discount_Percent INT NOT NULL CHECK (Discount_Percent > 0 AND Discount_Percent <= 100),
    Valid_Until TIMESTAMP NOT NULL, 
    Target_User_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE, 
    Is_Active BOOLEAN DEFAULT TRUE
);

-- 13 DETAY TABLOSU ER diyagramına ekle)
CREATE TABLE Ticket_Messages (
    Message_ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Ticket_ID UUID REFERENCES Support_Tickets(Ticket_ID) ON DELETE CASCADE,
    Sender_ID UUID REFERENCES Users(User_ID) ON DELETE CASCADE, --Customer veya Admin
    Message TEXT NOT NULL,
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);