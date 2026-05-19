-- 1. KULLANICILAR 
INSERT INTO Users (User_ID, First_Name, Last_Name, Email, Password_Hash, Role) VALUES
('11111111-1111-1111-1111-111111111111', 'Admin', 'Yönetici', 'admin@galeri.com', 'hashed_pw_admin', 'Admin'),
('22222222-2222-2222-2222-222222222222', 'Kaan', 'Tanıl', 'serifkaantanil@gmail.com', 'hashed_pw_kaan', 'Customer'),
('33333333-3333-3333-3333-333333333333', 'Osman Hamdi', 'Bey', 'osmanhamdi@sanat.com', 'hashed_pw_artist', 'Artist');

-- 2. SANATÇI PROFİLİ
INSERT INTO Artists (Artist_ID, User_ID, Full_Name, Biography, Birth_Date, Death_Date, Nationality) VALUES
('44444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 'Osman Hamdi Bey', 'İlk Türk arkeolog ve müzecisi.', '1842-12-30', '1910-02-24', 'Osmanlı');

-- 3. SANAT ESERLERİ
INSERT INTO Artworks (Artwork_ID, Artist_ID, Title, Description, Price, Category, Is_Campaign, Campaign_Discount_Percent) VALUES
('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'Kaplumbağa Terbiyecisi', '1906 yapımı ünlü tablo.', 50000.00, 'Yağlı Boya', FALSE, 0),
('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'Silah Taciri', '1908 tarihli eser.', 35000.00, 'Yağlı Boya', TRUE, 15);

-- 4. ETKİNLİKLER VE ATÖLYELER
INSERT INTO Events (Event_ID, Organizer_ID, Title, Description, Event_Date, Capacity, Price) VALUES
('77777777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'Osmanlı Sanat Tarihi Semineri', 'Klasik dönem incelemesi.', '2026-06-15 14:00:00', 50, 150.00);

-- 5. REZERVASYONLAR
INSERT INTO Reservations (Reservation_ID, User_ID, Event_ID, Participant_Count, Total_Price, Status) VALUES
('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 2, 300.00, 'Confirmed');

-- 6. SİPARİŞLER
INSERT INTO Orders (Order_ID, User_ID, Total_Amount, Payment_Method, Status) VALUES
('99999999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', 50000.00, 'Credit Card', 'Completed');

-- 7. SİPARİŞ KALEMLERİ
INSERT INTO Order_Items (Item_ID, Order_ID, Artwork_ID, Price_At_Purchase) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '99999999-9999-9999-9999-999999999999', '55555555-5555-5555-5555-555555555555', 50000.00);

-- 8. FAVORİLER
INSERT INTO Favorites (User_ID, Artwork_ID) VALUES
('22222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666666');

-- 9. YORUMLAR VE DEĞERLENDİRMELER
INSERT INTO Reviews (Review_ID, User_ID, Target_ID, Target_Type, Rating, Comment_Text) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'Artwork', 5, 'İnanılmaz bir detay seviyesi, salona çok yakıştı.');

-- 10. MÜŞTERİ DESTEK TABLOSU
INSERT INTO Support_Tickets (Ticket_ID, User_ID, Subject, Status) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Siparişim hakkında', 'Open');

-- 11. DETAY TABLOSU (Ticket Messages)
INSERT INTO Ticket_Messages (Message_ID, Ticket_ID, Sender_ID, Message) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Kargo takip numaramı alabilir miyim?');

-- 12. KARŞILAŞTIRMA GEÇMİŞİ
INSERT INTO Saved_Comparisons (Comparison_ID, User_ID, Comparison_Type, Items_Data, Title) VALUES
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 'Artwork', '{"items": ["55555555-5555-5555-5555-555555555555", "66666666-6666-6666-6666-666666666666"]}', 'Klasik Dönem Eserleri Karşılaştırması');

-- 13. KUPONLAR
INSERT INTO Coupons (Coupon_ID, Code, Discount_Percent, Valid_Until, Target_User_ID) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'YAZ20', 20, '2026-12-31 23:59:59', NULL);

-- ============================================================
-- EK SEED VERİLERİ (Frontend testi için zenginleştirilmiş data)
-- ============================================================

-- EK KULLANICILAR (sanatçıların user hesapları + ekstra müşteri)
INSERT INTO Users (User_ID, First_Name, Last_Name, Email, Password_Hash, Role) VALUES
('a1111111-1111-1111-1111-111111111111', 'Frida', 'Kahlo', 'frida@galeri.com', 'hashed_pw_frida', 'Artist'),
('a2222222-2222-2222-2222-222222222222', 'Pablo', 'Picasso', 'picasso@galeri.com', 'hashed_pw_picasso', 'Artist'),
('a3333333-3333-3333-3333-333333333333', 'Vincent', 'Van Gogh', 'vangogh@galeri.com', 'hashed_pw_vincent', 'Artist'),
('a4444444-4444-4444-4444-444444444444', 'Ayşe', 'Yılmaz', 'ayse@galeri.com', 'hashed_pw_ayse', 'Customer'),
('a5555555-5555-5555-5555-555555555555', 'Mehmet', 'Demir', 'mehmet@galeri.com', 'hashed_pw_mehmet', 'Customer');

-- EK SANATÇI PROFİLLERİ
INSERT INTO Artists (Artist_ID, User_ID, Full_Name, Biography, Birth_Date, Death_Date, Nationality) VALUES
('b1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'Frida Kahlo', 'Meksikalı ressam, otoportreleri ve sürrealist eserleriyle tanınır.', '1907-07-06', '1954-07-13', 'Meksikalı'),
('b2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'Pablo Picasso', 'Kübizmin kurucularından, 20. yüzyılın en etkili sanatçılarından biri.', '1881-10-25', '1973-04-08', 'İspanyol'),
('b3333333-3333-3333-3333-333333333333', 'a3333333-3333-3333-3333-333333333333', 'Vincent Van Gogh', 'Post-empresyonist ressam, modern sanata büyük katkı yapmıştır.', '1853-03-30', '1890-07-29', 'Hollandalı');

-- EK SANAT ESERLERİ (15 adet, farklı kategoriler, bazıları kampanyalı)
INSERT INTO Artworks (Artwork_ID, Artist_ID, Title, Description, Price, Category, Image_URL, Stock_Status, View_Count, Like_Count, Is_Campaign, Campaign_Discount_Percent) VALUES
-- Frida Kahlo eserleri
('c1000001-0000-0000-0000-000000000001', 'b1111111-1111-1111-1111-111111111111', 'Kırık Sütun', '1944 yapımı otoportre, sanatçının fiziksel acısını yansıtır.', 85000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800', 'Available', 142, 28, FALSE, 0),
('c1000002-0000-0000-0000-000000000002', 'b1111111-1111-1111-1111-111111111111', 'İki Frida', 'İkili kimliği keşfeden ünlü çift portre.', 120000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', 'Available', 215, 42, TRUE, 20),
('c1000003-0000-0000-0000-000000000003', 'b1111111-1111-1111-1111-111111111111', 'Yaralı Geyik', 'Sembolik anlamlarla yüklü bir kompozisyon.', 65000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800', 'Available', 89, 19, FALSE, 0),

-- Pablo Picasso eserleri
('c2000001-0000-0000-0000-000000000001', 'b2222222-2222-2222-2222-222222222222', 'Mavi Dönem Portresi', '1903 dönemine ait melankolik bir eser.', 200000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', 'Available', 312, 67, TRUE, 25),
('c2000002-0000-0000-0000-000000000002', 'b2222222-2222-2222-2222-222222222222', 'Kübist Natürmort', 'Kübizmin tipik özelliklerini sergileyen eser.', 175000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800', 'Available', 198, 51, FALSE, 0),
('c2000003-0000-0000-0000-000000000003', 'b2222222-2222-2222-2222-222222222222', 'Bronz Boğa Heykeli', 'Picasso''nun ünlü boğa serisinden bir parça.', 95000.00, 'Heykel', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', 'Available', 134, 31, FALSE, 0),
('c2000004-0000-0000-0000-000000000004', 'b2222222-2222-2222-2222-222222222222', 'Güvercin Eskizi', 'Barış sembolü olarak ünlenen küçük çalışma.', 15000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800', 'Available', 78, 22, TRUE, 10),

-- Vincent van Gogh eserleri
('c3000001-0000-0000-0000-000000000001', 'b3333333-3333-3333-3333-333333333333', 'Yıldızlı Gece Çalışması', 'Sanatçının ünlü gece manzaralarından bir eskiz.', 250000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800', 'Available', 421, 89, TRUE, 15),
('c3000002-0000-0000-0000-000000000002', 'b3333333-3333-3333-3333-333333333333', 'Ayçiçekleri', 'Parlak sarıların hakim olduğu, hayat dolu kompozisyon.', 180000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800', 'Sold', 287, 73, FALSE, 0),
('c3000003-0000-0000-0000-000000000003', 'b3333333-3333-3333-3333-333333333333', 'Buğday Tarlası', 'Açık hava manzarası, post-empresyonist tarzda.', 145000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1536924940684-8e4f898b4146?w=800', 'Available', 167, 38, FALSE, 0),
('c3000004-0000-0000-0000-000000000004', 'b3333333-3333-3333-3333-333333333333', 'Köy Manzarası Suluboya', 'Naif çizgilerle yapılmış kırsal manzara.', 28000.00, 'Suluboya', 'https://images.unsplash.com/photo-1518518873111-6ca469aa4560?w=800', 'Available', 56, 14, FALSE, 0),

-- Osman Hamdi Bey ek eserler
('c4000001-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', 'Müşteri Bekleyen Esnaf', '1906 tarihli çarşı sahnesi.', 42000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1580687580441-96dbadf8f3c8?w=800', 'Available', 98, 24, FALSE, 0),
('c4000002-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444', 'Akrilik Etüt', 'Modern bir yeniden yorumlama.', 8500.00, 'Akrilik', 'https://images.unsplash.com/photo-1569783721854-33a99b4c0bae?w=800', 'Available', 45, 11, TRUE, 30),
('c4000003-0000-0000-0000-000000000003', '44444444-4444-4444-4444-444444444444', 'Mihrap Çalışması', 'Detaylı mimari betimleme.', 72000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1606819717115-9159c900370b?w=800', 'Available', 134, 29, FALSE, 0),
('c4000004-0000-0000-0000-000000000004', '44444444-4444-4444-4444-444444444444', 'Karma Teknik Eser', 'Geleneksel ve modern öğeleri buluşturan eser.', 5500.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1545830384-3a2061eb44ed?w=800', 'Available', 32, 8, FALSE, 0);

-- EK ETKİNLİKLER (5 adet, farklı tarihler)
INSERT INTO Events (Event_ID, Organizer_ID, Title, Description, Event_Date, Capacity, Price, Image_URL, Is_Campaign) VALUES
('d1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Yağlı Boya Atölyesi', 'Başlangıç seviyesi için yağlı boya teknikleri. Tüm malzemeler dahil.', '2026-06-22 14:00:00', 12, 450.00, 'https://images.unsplash.com/photo-1541753866388-0b3c701627d3?w=800', FALSE),
('d2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Suluboya ile Manzara Çalışması', 'Hafta sonu manzara atölyesi, doğada uygulamalı eğitim.', '2026-06-28 10:00:00', 10, 380.00, 'https://images.unsplash.com/photo-1507010444286-828ea71bfac7?w=800', TRUE),
('d3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Modern Heykel Atölyesi', '5 saatlik yoğunlaştırılmış heykel kursu.', '2026-07-05 13:00:00', 8, 600.00, 'https://images.unsplash.com/photo-1597274303632-880ef8660375?w=800', FALSE),
('d4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Sanat Tarihine Giriş Semineri', 'Rönesans''tan günümüze sanat akımları.', '2026-07-12 16:00:00', 50, 200.00, 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800', FALSE),
('d5555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Çocuklar İçin Resim Atölyesi', '7-12 yaş arası çocuklar için eğlenceli resim çalışması.', '2026-07-19 11:00:00', 15, 250.00, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', TRUE);

-- EK KUPONLAR (herkese açık: Target_User_ID NULL)
INSERT INTO Coupons (Coupon_ID, Code, Discount_Percent, Valid_Until, Target_User_ID, Is_Active) VALUES
('e1111111-1111-1111-1111-111111111111', 'SANAT20', 20, '2026-12-31 23:59:59', NULL, TRUE),
('e2222222-2222-2222-2222-222222222222', 'ESER15', 15, '2026-12-31 23:59:59', NULL, TRUE),
('e3333333-3333-3333-3333-333333333333', 'YENI10', 10, '2026-12-31 23:59:59', NULL, TRUE);

-- EK YORUMLAR (eserlere dağılmış, sanatçı yanıtı dahil bazılarında)
INSERT INTO Reviews (Review_ID, User_ID, Target_ID, Target_Type, Rating, Comment_Text, Reply_Text, Replied_At, Helpful_Votes) VALUES
('f1111111-1111-1111-1111-111111111111', 'a4444444-4444-4444-4444-444444444444', 'c1000002-0000-0000-0000-000000000002', 'Artwork', 5, 'Frida''nın bu eseri inanılmaz, evime çok yakıştı!', 'Çok teşekkür ederim, iyi günlerde kullanın!', '2026-04-15 10:30:00', 12),
('f2222222-2222-2222-2222-222222222222', 'a5555555-5555-5555-5555-555555555555', 'c1000002-0000-0000-0000-000000000002', 'Artwork', 4, 'Renkleri canlı, fiyatı biraz yüksek ama değer.', NULL, NULL, 8),
('f3333333-3333-3333-3333-333333333333', 'a4444444-4444-4444-4444-444444444444', 'c3000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Yıldızlı gece çalışması harika, detayları muhteşem.', NULL, NULL, 15),
('f4444444-4444-4444-4444-444444444444', 'a5555555-5555-5555-5555-555555555555', 'c2000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Mavi dönem hayranlarına şiddetle tavsiye ederim.', 'Beğenmenize sevindim!', '2026-04-20 14:15:00', 22),
('f5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'c2000003-0000-0000-0000-000000000003', 'Artwork', 4, 'Heykel kalitesi çok iyi, salonda harika duruyor.', NULL, NULL, 5),
('f6666666-6666-6666-6666-666666666666', 'a4444444-4444-4444-4444-444444444444', 'c3000003-0000-0000-0000-000000000003', 'Artwork', 5, 'Buğday tarlası tablosu odamı aydınlatıyor.', NULL, NULL, 9);
