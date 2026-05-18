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


-- ============================================================
-- GENİŞLETİLMİŞ TEST VERİSİ — GERÇEK GALERİ DENEYİMİ İÇİN
-- ============================================================

-- 12 YENİ MÜŞTERİ (yorumlar, satışlar, rezervasyonlar için)
INSERT INTO Users (User_ID, First_Name, Last_Name, Email, Password_Hash, Role) VALUES
('ba111111-aaaa-bbbb-cccc-111111111111', 'Selin', 'Aydın', 'selin@test.com', 'hashed_pw_s', 'Customer'),
('ba111111-aaaa-bbbb-cccc-222222222222', 'Burak', 'Çelik', 'burak@test.com', 'hashed_pw_b', 'Customer'),
('ba111111-aaaa-bbbb-cccc-333333333333', 'Deniz', 'Şahin', 'deniz@test.com', 'hashed_pw_d', 'Customer'),
('ba111111-aaaa-bbbb-cccc-444444444444', 'Elif', 'Korkmaz', 'elif@test.com', 'hashed_pw_e', 'Customer'),
('ba111111-aaaa-bbbb-cccc-555555555555', 'Furkan', 'Aksoy', 'furkan@test.com', 'hashed_pw_f', 'Customer'),
('ba111111-aaaa-bbbb-cccc-666666666666', 'Gizem', 'Polat', 'gizem@test.com', 'hashed_pw_g', 'Customer'),
('ba111111-aaaa-bbbb-cccc-777777777777', 'Hakan', 'Erdoğan', 'hakan@test.com', 'hashed_pw_h', 'Customer'),
('ba111111-aaaa-bbbb-cccc-888888888888', 'Iraz', 'Güneş', 'iraz@test.com', 'hashed_pw_i', 'Customer'),
('ba111111-aaaa-bbbb-cccc-999999999999', 'Kerem', 'Yavuz', 'kerem@test.com', 'hashed_pw_k', 'Customer'),
('ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'Leyla', 'Toprak', 'leyla@test.com', 'hashed_pw_l', 'Customer'),
('ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'Murat', 'Kara', 'murat@test.com', 'hashed_pw_m', 'Customer'),
('ba111111-aaaa-bbbb-cccc-cccccccccccc', 'Nazlı', 'Öztürk', 'nazli@test.com', 'hashed_pw_n', 'Customer');

-- VIEW_COUNT ve LIKE_COUNT'ları gerçekçi sayılarla güncelle (mevcut eserler için)
UPDATE Artworks SET View_Count = 458, Like_Count = 67 WHERE Artwork_ID = '55555555-5555-5555-5555-555555555555'; -- Kaplumbağa Terbiyecisi
UPDATE Artworks SET View_Count = 312, Like_Count = 45 WHERE Artwork_ID = '66666666-6666-6666-6666-666666666666'; -- Silah Taciri
UPDATE Artworks SET View_Count = 287, Like_Count = 52 WHERE Artwork_ID = 'c1000001-0000-0000-0000-000000000001'; -- Kırık Sütun
UPDATE Artworks SET View_Count = 615, Like_Count = 124 WHERE Artwork_ID = 'c1000002-0000-0000-0000-000000000002'; -- İki Frida
UPDATE Artworks SET View_Count = 189, Like_Count = 31 WHERE Artwork_ID = 'c1000003-0000-0000-0000-000000000003'; -- Yaralı Geyik
UPDATE Artworks SET View_Count = 542, Like_Count = 98 WHERE Artwork_ID = 'c2000001-0000-0000-0000-000000000001'; -- Mavi Dönem
UPDATE Artworks SET View_Count = 398, Like_Count = 76 WHERE Artwork_ID = 'c2000002-0000-0000-0000-000000000002'; -- Kübist Natürmort
UPDATE Artworks SET View_Count = 234, Like_Count = 41 WHERE Artwork_ID = 'c2000003-0000-0000-0000-000000000003'; -- Bronz Boğa
UPDATE Artworks SET View_Count = 156, Like_Count = 28 WHERE Artwork_ID = 'c2000004-0000-0000-0000-000000000004'; -- Güvercin
UPDATE Artworks SET View_Count = 847, Like_Count = 178 WHERE Artwork_ID = 'c3000001-0000-0000-0000-000000000001'; -- Yıldızlı Gece
UPDATE Artworks SET View_Count = 723, Like_Count = 156 WHERE Artwork_ID = 'c3000002-0000-0000-0000-000000000002'; -- Ayçiçekleri
UPDATE Artworks SET View_Count = 392, Like_Count = 68 WHERE Artwork_ID = 'c3000003-0000-0000-0000-000000000003'; -- Buğday Tarlası
UPDATE Artworks SET View_Count = 128, Like_Count = 22 WHERE Artwork_ID = 'c3000004-0000-0000-0000-000000000004'; -- Köy Manzarası
UPDATE Artworks SET View_Count = 245, Like_Count = 39 WHERE Artwork_ID = 'c4000001-0000-0000-0000-000000000001'; -- Müşteri Bekleyen Esnaf
UPDATE Artworks SET View_Count = 87, Like_Count = 16 WHERE Artwork_ID = 'c4000002-0000-0000-0000-000000000002'; -- Akrilik Etüt
UPDATE Artworks SET View_Count = 298, Like_Count = 54 WHERE Artwork_ID = 'c4000003-0000-0000-0000-000000000003'; -- Mihrap Çalışması
UPDATE Artworks SET View_Count = 64, Like_Count = 11 WHERE Artwork_ID = 'c4000004-0000-0000-0000-000000000004'; -- Karma Teknik

-- ETKİNLİKLERE de View_Count ekleyelim
UPDATE Events SET View_Count = 234 WHERE Event_ID = '77777777-7777-7777-7777-777777777777';
UPDATE Events SET View_Count = 412 WHERE Event_ID = 'd1111111-1111-1111-1111-111111111111';
UPDATE Events SET View_Count = 318 WHERE Event_ID = 'd2222222-2222-2222-2222-222222222222';
UPDATE Events SET View_Count = 156 WHERE Event_ID = 'd3333333-3333-3333-3333-333333333333';
UPDATE Events SET View_Count = 287 WHERE Event_ID = 'd4444444-4444-4444-4444-444444444444';
UPDATE Events SET View_Count = 524 WHERE Event_ID = 'd5555555-5555-5555-5555-555555555555';

-- 25 YENİ YORUM (eserlere ve etkinliklere dağılmış)
INSERT INTO Reviews (Review_ID, User_ID, Target_ID, Target_Type, Rating, Comment_Text, Reply_Text, Replied_At, Helpful_Votes) VALUES
-- Kaplumbağa Terbiyecisi yorumları
('aa000001-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', '55555555-5555-5555-5555-555555555555', 'Artwork', 5, 'Türk resim sanatının başyapıtlarından, evimde gururla sergiliyorum.', NULL, NULL, 23),
('aa000001-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', '55555555-5555-5555-5555-555555555555', 'Artwork', 5, 'Detaylar muhteşem, fiyatına da değer kesinlikle.', 'Teşekkürler, eserin yeni sahibine kavuşması sevindirici.', '2026-04-22 11:30:00', 18),
('aa000001-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-333333333333', '55555555-5555-5555-5555-555555555555', 'Artwork', 4, 'Çok güzel ama beklediğimden biraz farklıydı renkler.', NULL, NULL, 7),

-- Silah Taciri
('aa000002-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-444444444444', '66666666-6666-6666-6666-666666666666', 'Artwork', 5, 'Osman Hamdi Bey hayranıyım, bu eser kolleksiyonumun başında.', NULL, NULL, 14),
('aa000002-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-555555555555', '66666666-6666-6666-6666-666666666666', 'Artwork', 4, 'Kampanya fiyatıyla aldım, çok memnun kaldım.', NULL, NULL, 9),

-- Kırık Sütun (Frida)
('aa000003-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-666666666666', 'c1000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Frida''nın acısını her bakışta hissediyorum, çok güçlü bir eser.', NULL, NULL, 31),
('aa000003-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-777777777777', 'c1000001-0000-0000-0000-000000000001', 'Artwork', 4, 'Otoportrenin gücü inanılmaz.', NULL, NULL, 12),

-- İki Frida
('aa000004-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-888888888888', 'c1000002-0000-0000-0000-000000000002', 'Artwork', 5, 'Kimlik temasını bu kadar güzel işleyen başka eser zor bulunur.', 'İlginiz için teşekkürler!', '2026-04-25 09:15:00', 28),
('aa000004-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-999999999999', 'c1000002-0000-0000-0000-000000000002', 'Artwork', 5, 'Salon duvarımda öne çıkıyor, herkes soruyor.', NULL, NULL, 17),
('aa000004-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'c1000002-0000-0000-0000-000000000002', 'Artwork', 4, 'Çok güzel ama %20 indirim olmasa pahalı olurdu.', NULL, NULL, 11),

-- Mavi Dönem Picasso
('aa000005-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'c2000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Picasso''nun bu dönemi en sevdiğim, gerçek bir hazine.', NULL, NULL, 35),
('aa000005-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-cccccccccccc', 'c2000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Melankolik atmosfer çok başarılı yansıtılmış.', 'Mavi dönemin ruhunu yakaladığınızı duymak güzel.', '2026-05-01 14:20:00', 22),
('aa000005-0000-0000-0000-000000000003', 'a4444444-4444-4444-4444-444444444444', 'c2000001-0000-0000-0000-000000000001', 'Artwork', 3, 'İyi eser ama biraz daha canlı renkler olabilirdi.', NULL, NULL, 4),

-- Kübist Natürmort
('aa000006-0000-0000-0000-000000000001', 'a5555555-5555-5555-5555-555555555555', 'c2000002-0000-0000-0000-000000000002', 'Artwork', 5, 'Kübizmin tüm öğeleri burada toplanmış.', NULL, NULL, 19),

-- Bronz Boğa
('aa000007-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', 'c2000003-0000-0000-0000-000000000003', 'Artwork', 4, 'Üç boyutlu olarak çok etkileyici, ışık altında daha güzel görünüyor.', NULL, NULL, 13),

-- Yıldızlı Gece
('aa000008-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-222222222222', 'c3000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Van Gogh''un dehası bu eserde belli oluyor, gece manzarası muhteşem.', NULL, NULL, 42),
('aa000008-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-333333333333', 'c3000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Yıldızların hareketini hissediyorsunuz, inanılmaz.', NULL, NULL, 38),
('aa000008-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-444444444444', 'c3000001-0000-0000-0000-000000000001', 'Artwork', 5, 'Kampanyalı fiyatına alabildiğim için şanslıyım.', 'Memnuniyetinizi paylaşmanız çok değerli.', '2026-05-03 10:45:00', 25),

-- Buğday Tarlası
('aa000009-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-555555555555', 'c3000003-0000-0000-0000-000000000003', 'Artwork', 4, 'Doğa sevenler için ideal, renk paleti dingin.', NULL, NULL, 8),

-- Müşteri Bekleyen Esnaf
('aa000010-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-666666666666', 'c4000001-0000-0000-0000-000000000001', 'Artwork', 4, 'Çarşı sahnesi çok detaylı, dönem ruhunu yansıtıyor.', NULL, NULL, 6),

-- Mihrap Çalışması
('aa000011-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-777777777777', 'c4000003-0000-0000-0000-000000000003', 'Artwork', 5, 'Mimari detaylar şahane, fiyatına değer.', NULL, NULL, 11),

-- ETKİNLİK YORUMLARI
('aa000012-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-888888888888', '77777777-7777-7777-7777-777777777777', 'Event', 5, 'Çok bilgilendirici bir seminerdi, tekrar katılırım.', NULL, NULL, 7),
('aa000012-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-999999999999', '77777777-7777-7777-7777-777777777777', 'Event', 4, 'Konu seçimi güzeldi ama biraz daha uzun olabilirdi.', NULL, NULL, 4),
('aa000013-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'd1111111-1111-1111-1111-111111111111', 'Event', 5, 'Yağlı boya atölyesi harikaydı, eğitmen çok ilgiliydi.', NULL, NULL, 12),
('aa000013-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'd1111111-1111-1111-1111-111111111111', 'Event', 5, 'Malzeme kalitesi yüksekti, eğitim doyurucuydu.', NULL, NULL, 9);

-- SİPARİŞLER (8 adet, çeşitli durumlarda)
INSERT INTO Orders (Order_ID, User_ID, Total_Amount, Payment_Method, Status) VALUES
('da000001-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', 85000.00, 'Credit Card', 'Completed'),
('da000001-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', 120000.00, 'Bank Transfer', 'Completed'),
('da000001-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-333333333333', 28000.00, 'Credit Card', 'Completed'),
('da000001-0000-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-444444444444', 145000.00, 'Credit Card', 'Completed'),
('da000001-0000-0000-0000-000000000005', 'ba111111-aaaa-bbbb-cccc-555555555555', 42000.00, 'Credit Card', 'Completed'),
('da000001-0000-0000-0000-000000000006', 'ba111111-aaaa-bbbb-cccc-666666666666', 95000.00, 'Bank Transfer', 'Pending'),
('da000001-0000-0000-0000-000000000007', 'ba111111-aaaa-bbbb-cccc-777777777777', 65000.00, 'Credit Card', 'Completed'),
('da000001-0000-0000-0000-000000000008', 'ba111111-aaaa-bbbb-cccc-888888888888', 15000.00, 'Credit Card', 'Completed');

-- SİPARİŞ KALEMLERİ
INSERT INTO Order_Items (Item_ID, Order_ID, Artwork_ID, Price_At_Purchase) VALUES
('ea000001-0000-0000-0000-000000000001', 'da000001-0000-0000-0000-000000000001', 'c1000001-0000-0000-0000-000000000001', 85000.00),
('ea000001-0000-0000-0000-000000000002', 'da000001-0000-0000-0000-000000000002', 'c1000002-0000-0000-0000-000000000002', 120000.00),
('ea000001-0000-0000-0000-000000000003', 'da000001-0000-0000-0000-000000000003', 'c3000004-0000-0000-0000-000000000004', 28000.00),
('ea000001-0000-0000-0000-000000000004', 'da000001-0000-0000-0000-000000000004', 'c3000003-0000-0000-0000-000000000003', 145000.00),
('ea000001-0000-0000-0000-000000000005', 'da000001-0000-0000-0000-000000000005', 'c4000001-0000-0000-0000-000000000001', 42000.00),
('ea000001-0000-0000-0000-000000000006', 'da000001-0000-0000-0000-000000000006', 'c2000003-0000-0000-0000-000000000003', 95000.00),
('ea000001-0000-0000-0000-000000000007', 'da000001-0000-0000-0000-000000000007', 'c1000003-0000-0000-0000-000000000003', 65000.00),
('ea000001-0000-0000-0000-000000000008', 'da000001-0000-0000-0000-000000000008', 'c2000004-0000-0000-0000-000000000004', 15000.00);

-- REZERVASYONLAR (kontenjanları gerçekçi şekilde azalt)
-- Önce kapasiteyi azaltalım (daha önceki seed'deki kapasitelere göre)
UPDATE Events SET Capacity = 30 WHERE Event_ID = '77777777-7777-7777-7777-777777777777'; -- 50 idi, 20 rezervasyon var
UPDATE Events SET Capacity = 3  WHERE Event_ID = 'd1111111-1111-1111-1111-111111111111'; -- 12 idi, 9 rezervasyon (neredeyse dolu)
UPDATE Events SET Capacity = 7  WHERE Event_ID = 'd2222222-2222-2222-2222-222222222222'; -- 10 idi
UPDATE Events SET Capacity = 8  WHERE Event_ID = 'd3333333-3333-3333-3333-333333333333'; -- 8 idi (boş)
UPDATE Events SET Capacity = 35 WHERE Event_ID = 'd4444444-4444-4444-4444-444444444444'; -- 50 idi
UPDATE Events SET Capacity = 0  WHERE Event_ID = 'd5555555-5555-5555-5555-555555555555'; -- 15 idi, DOLU

INSERT INTO Reservations (Reservation_ID, User_ID, Event_ID, Participant_Count, Total_Price, Status) VALUES
-- Osmanlı Sanat Tarihi Semineri (5 rezervasyon, 20 katılımcı)
('fa000001-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', '77777777-7777-7777-7777-777777777777', 2, 300.00, 'Confirmed'),
('fa000001-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', '77777777-7777-7777-7777-777777777777', 4, 600.00, 'Confirmed'),
('fa000001-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-333333333333', '77777777-7777-7777-7777-777777777777', 5, 750.00, 'Confirmed'),
('fa000001-0000-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-444444444444', '77777777-7777-7777-7777-777777777777', 6, 900.00, 'Pending'),
('fa000001-0000-0000-0000-000000000005', 'ba111111-aaaa-bbbb-cccc-555555555555', '77777777-7777-7777-7777-777777777777', 3, 450.00, 'Confirmed'),
-- Yağlı Boya Atölyesi (3 rezervasyon, 9 katılımcı, doluya yakın)
('fa000002-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-666666666666', 'd1111111-1111-1111-1111-111111111111', 3, 1350.00, 'Confirmed'),
('fa000002-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-777777777777', 'd1111111-1111-1111-1111-111111111111', 4, 1800.00, 'Confirmed'),
('fa000002-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-888888888888', 'd1111111-1111-1111-1111-111111111111', 2, 900.00, 'Confirmed'),
-- Suluboya Atölyesi (1 rezervasyon)
('fa000003-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-999999999999', 'd2222222-2222-2222-2222-222222222222', 3, 1140.00, 'Confirmed'),
-- Çocuk Atölyesi DOLU (3 rezervasyon, 15 katılımcı)
('fa000005-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'd5555555-5555-5555-5555-555555555555', 5, 1250.00, 'Confirmed'),
('fa000005-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'd5555555-5555-5555-5555-555555555555', 6, 1500.00, 'Confirmed'),
('fa000005-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-cccccccccccc', 'd5555555-5555-5555-5555-555555555555', 4, 1000.00, 'Confirmed'),
-- Sanat Tarihi Semineri (3 rezervasyon, 15 katılımcı)
('fa000004-0000-0000-0000-000000000001', 'a4444444-4444-4444-4444-444444444444', 'd4444444-4444-4444-4444-444444444444', 5, 1000.00, 'Confirmed'),
('fa000004-0000-0000-0000-000000000002', 'a5555555-5555-5555-5555-555555555555', 'd4444444-4444-4444-4444-444444444444', 8, 1600.00, 'Confirmed'),
('fa000004-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-111111111111', 'd4444444-4444-4444-4444-444444444444', 2, 400.00, 'Pending');

-- FAVORİLER (30 favori ilişkisi, çeşitli kullanıcı-eser kombinasyonları)
INSERT INTO Favorites (User_ID, Artwork_ID) VALUES
-- Selin'in favorileri
('ba111111-aaaa-bbbb-cccc-111111111111', 'c1000002-0000-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-111111111111', 'c3000001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-111111111111', '55555555-5555-5555-5555-555555555555'),
-- Burak
('ba111111-aaaa-bbbb-cccc-222222222222', 'c2000001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-222222222222', 'c3000001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-222222222222', 'c2000002-0000-0000-0000-000000000002'),
-- Deniz
('ba111111-aaaa-bbbb-cccc-333333333333', 'c3000002-0000-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-333333333333', 'c1000001-0000-0000-0000-000000000001'),
-- Elif
('ba111111-aaaa-bbbb-cccc-444444444444', 'c3000001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-444444444444', 'c1000002-0000-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-444444444444', '66666666-6666-6666-6666-666666666666'),
-- Furkan
('ba111111-aaaa-bbbb-cccc-555555555555', 'c2000003-0000-0000-0000-000000000003'),
('ba111111-aaaa-bbbb-cccc-555555555555', 'c4000003-0000-0000-0000-000000000003'),
-- Gizem
('ba111111-aaaa-bbbb-cccc-666666666666', 'c1000002-0000-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-666666666666', 'c2000001-0000-0000-0000-000000000001'),
-- Hakan
('ba111111-aaaa-bbbb-cccc-777777777777', 'c3000001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-777777777777', '55555555-5555-5555-5555-555555555555'),
-- Iraz
('ba111111-aaaa-bbbb-cccc-888888888888', 'c1000003-0000-0000-0000-000000000003'),
('ba111111-aaaa-bbbb-cccc-888888888888', 'c2000004-0000-0000-0000-000000000004'),
-- Kerem
('ba111111-aaaa-bbbb-cccc-999999999999', 'c3000002-0000-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-999999999999', 'c3000001-0000-0000-0000-000000000001'),
-- Leyla
('ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'c1000002-0000-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'c4000001-0000-0000-0000-000000000001'),
-- Murat
('ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'c2000001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', '66666666-6666-6666-6666-666666666666'),
-- Nazlı
('ba111111-aaaa-bbbb-cccc-cccccccccccc', 'c3000001-0000-0000-0000-000000000001'),
-- Ayşe (önceki seed kullanıcısı)
('a4444444-4444-4444-4444-444444444444', 'c1000002-0000-0000-0000-000000000002'),
('a4444444-4444-4444-4444-444444444444', 'c2000001-0000-0000-0000-000000000001'),
-- Mehmet (önceki)
('a5555555-5555-5555-5555-555555555555', 'c3000001-0000-0000-0000-000000000001'),
('a5555555-5555-5555-5555-555555555555', 'c1000001-0000-0000-0000-000000000001');

-- KARŞILAŞTIRMA GEÇMİŞİ (5 adet)
INSERT INTO Saved_Comparisons (Comparison_ID, User_ID, Comparison_Type, Items_Data, Title) VALUES
('ca000001-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', 'Artwork', '{"items": ["c1000002-0000-0000-0000-000000000002", "c3000001-0000-0000-0000-000000000001"]}', 'İki Frida vs Yıldızlı Gece'),
('ca000001-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', 'Artwork', '{"items": ["c2000001-0000-0000-0000-000000000001", "c2000002-0000-0000-0000-000000000002", "c2000003-0000-0000-0000-000000000003"]}', 'Picasso Karşılaştırması'),
('ca000001-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-333333333333', 'Event', '{"items": ["d1111111-1111-1111-1111-111111111111", "d2222222-2222-2222-2222-222222222222"]}', 'Yağlı vs Suluboya Atölyesi'),
('ca000001-0000-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-444444444444', 'Artwork', '{"items": ["55555555-5555-5555-5555-555555555555", "66666666-6666-6666-6666-666666666666"]}', 'Osman Hamdi Bey Eserleri'),
('ca000001-0000-0000-0000-000000000005', 'ba111111-aaaa-bbbb-cccc-555555555555', 'Artwork', '{"items": ["c3000001-0000-0000-0000-000000000001", "c3000002-0000-0000-0000-000000000002", "c3000003-0000-0000-0000-000000000003"]}', 'Van Gogh Üçlüsü');

-- DESTEK TALEPLERİ (4 adet, çeşitli durumlarda)
INSERT INTO Support_Tickets (Ticket_ID, User_ID, Subject, Status) VALUES
('1a000001-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', 'Kargo takip numarası', 'Resolved'),
('1a000001-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', 'Rezervasyon değişikliği talebi', 'Open'),
('1a000001-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-333333333333', 'Eser hakkında bilgi', 'Closed'),
('1a000001-0000-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-444444444444', 'Ödeme sorunu', 'Open');

-- TİCKET MESAJLARI
INSERT INTO Ticket_Messages (Message_ID, Ticket_ID, Sender_ID, Message) VALUES
('2a000001-0000-0000-0000-000000000001', '1a000001-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', 'Aldığım eserin kargo takip numarasını alabilir miyim?'),
('2a000001-0000-0000-0000-000000000002', '1a000001-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Merhaba, takip numaranız: TR123456789. Yarın elinizde olacaktır.'),
('2a000001-0000-0000-0000-000000000003', '1a000001-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', 'Hafta sonu atölyemi pazartesiye değiştirebilir miyim?'),
('2a000001-0000-0000-0000-000000000004', '1a000001-0000-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-333333333333', 'Yıldızlı Gece eserinin orjinal boyutu nedir?'),
('2a000001-0000-0000-0000-000000000005', '1a000001-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Boyut bilgisi 73x92 cm''dir. Detaylı bilgi için galeriyi ziyaret edebilirsiniz.'),
('2a000001-0000-0000-0000-000000000006', '1a000001-0000-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-444444444444', 'Kredi kartı ödemem başarısız oldu, yardım edebilir misiniz?');

-- EK KUPONLAR (Frontend test edebilsin diye)
INSERT INTO Coupons (Coupon_ID, Code, Discount_Percent, Valid_Until, Target_User_ID, Is_Active) VALUES
('e4444444-4444-4444-4444-444444444444', 'ATOLYE30', 30, '2026-12-31 23:59:59', NULL, TRUE),
('e5555555-5555-5555-5555-555555555555', 'OZELGUN50', 50, '2026-06-30 23:59:59', NULL, TRUE),
('e6666666-6666-6666-6666-666666666666', 'EXPIRED', 25, '2025-01-01 00:00:00', NULL, TRUE);


-- ============================================================
-- 20 EK SANAT ESERİ + İLGİLİ DATA (35+ esere çıkarmak için)
-- ============================================================

-- Frida Kahlo ek eserleri
INSERT INTO Artworks (Artwork_ID, Artist_ID, Title, Description, Price, Category, Image_URL, Stock_Status, View_Count, Like_Count, Is_Campaign, Campaign_Discount_Percent) VALUES
('c1100001-0000-0000-0000-000000000001', 'b1111111-1111-1111-1111-111111111111', 'Diego ve Ben', 'Sanatçının kocası Diego Rivera ile çift portresi.', 95000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1578321272125-4e4c4c3643c5?w=800', 'Available', 178, 34, FALSE, 0),
('c1100001-0000-0000-0000-000000000002', 'b1111111-1111-1111-1111-111111111111', 'Maymunlu Otoportre', 'Tropikal motiflerle bezeli sembolik bir kompozisyon.', 75000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1579541591970-e5cf0a3a3d7e?w=800', 'Available', 145, 28, TRUE, 18),
('c1100001-0000-0000-0000-000000000003', 'b1111111-1111-1111-1111-111111111111', 'Hayat Suyu', 'Akrilik teknikle yapılmış küçük ölçekli eser.', 22000.00, 'Akrilik', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800', 'Available', 89, 15, FALSE, 0),

-- Pablo Picasso ek eserleri
('c2200001-0000-0000-0000-000000000001', 'b2222222-2222-2222-2222-222222222222', 'Pembe Dönem Akrobatı', 'Picasso''nun pembe dönemine ait nadide çalışma.', 165000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', 'Available', 256, 48, FALSE, 0),
('c2200001-0000-0000-0000-000000000002', 'b2222222-2222-2222-2222-222222222222', 'Soyut Yüz', 'Geç dönem soyut portre denemesi.', 88000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800', 'Available', 134, 26, TRUE, 12),
('c2200001-0000-0000-0000-000000000003', 'b2222222-2222-2222-2222-222222222222', 'Seramik Tabak', 'El yapımı dekoratif seramik eser.', 18500.00, 'Heykel', 'https://images.unsplash.com/photo-1578926078187-398f3a3e4a59?w=800', 'Available', 67, 12, FALSE, 0),
('c2200001-0000-0000-0000-000000000004', 'b2222222-2222-2222-2222-222222222222', 'Boğa Güreşi Eskizi', 'Çini mürekkep ile yapılmış eskiz.', 12000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800', 'Available', 92, 19, FALSE, 0),

-- Vincent Van Gogh ek eserleri
('c3300001-0000-0000-0000-000000000001', 'b3333333-3333-3333-3333-333333333333', 'Zambaklar', 'Hospital dönemi natürmort çalışması.', 155000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1614102095300-9aaaab9b51e8?w=800', 'Available', 387, 82, TRUE, 20),
('c3300001-0000-0000-0000-000000000002', 'b3333333-3333-3333-3333-333333333333', 'Kahve İçen Köylü', 'Hollanda dönemi portresi.', 92000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800', 'Sold', 245, 51, FALSE, 0),
('c3300001-0000-0000-0000-000000000003', 'b3333333-3333-3333-3333-333333333333', 'Servi Ağaçları', 'Provence manzaraları serisinden.', 135000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800', 'Available', 298, 63, FALSE, 0),
('c3300001-0000-0000-0000-000000000004', 'b3333333-3333-3333-3333-333333333333', 'Kahve Köşesi Suluboya', 'Küçük boyutlu suluboya çalışması.', 18000.00, 'Suluboya', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800', 'Available', 78, 16, TRUE, 15),

-- Osman Hamdi Bey ek eserleri
('c4400001-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', 'Kuran Okuyan Adam', 'Klasik Osmanlı dönemi içmekan tasviri.', 58000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=800', 'Available', 187, 35, FALSE, 0),
('c4400001-0000-0000-0000-000000000002', '44444444-4444-4444-4444-444444444444', 'Sokak Köpekleri', 'Modern eskiz, sosyal hayat sahnesi.', 9500.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1545830384-3a2061eb44ed?w=800', 'Available', 56, 11, TRUE, 25),
('c4400001-0000-0000-0000-000000000003', '44444444-4444-4444-4444-444444444444', 'Heykel Etüdü', 'Tunç döküm küçük heykel.', 32000.00, 'Heykel', 'https://images.unsplash.com/photo-1597274303632-880ef8660375?w=800', 'Available', 134, 24, FALSE, 0),
('c4400001-0000-0000-0000-000000000004', '44444444-4444-4444-4444-444444444444', 'Boğaz Manzarası', 'Suluboya teknikle İstanbul manzarası.', 14500.00, 'Suluboya', 'https://images.unsplash.com/photo-1507010444286-828ea71bfac7?w=800', 'Available', 95, 18, FALSE, 0),
('c4400001-0000-0000-0000-000000000005', '44444444-4444-4444-4444-444444444444', 'Antik Çini Reprodüksiyon', 'El yapımı çini panel.', 6500.00, 'Heykel', 'https://images.unsplash.com/photo-1578926078187-398f3a3e4a59?w=800', 'Available', 42, 8, TRUE, 30),

-- Daha uygun fiyatlı eserler (giriş seviyesi koleksiyoncular için)
('c5500001-0000-0000-0000-000000000001', 'b1111111-1111-1111-1111-111111111111', 'Çiçekli Etüt', 'Küçük boyutlu Frida etüdü.', 4500.00, 'Akrilik', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 'Available', 38, 7, FALSE, 0),
('c5500001-0000-0000-0000-000000000002', 'b2222222-2222-2222-2222-222222222222', 'Mini Picasso', 'Stil çalışması, sınırlı sayıda baskı.', 3800.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800', 'Available', 52, 9, TRUE, 10),
('c5500001-0000-0000-0000-000000000003', 'b3333333-3333-3333-3333-333333333333', 'Van Gogh Stil Eskiz', 'Post-empresyonist tarzda küçük çalışma.', 5200.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1518518873111-6ca469aa4560?w=800', 'Available', 67, 13, FALSE, 0),
('c5500001-0000-0000-0000-000000000004', '44444444-4444-4444-4444-444444444444', 'Karakalem Portre', 'Klasik tekniğinde karakalem çalışması.', 2800.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', 'Available', 28, 5, FALSE, 0);

-- Yeni eserlere yorumlar
INSERT INTO Reviews (Review_ID, User_ID, Target_ID, Target_Type, Rating, Comment_Text, Reply_Text, Replied_At, Helpful_Votes) VALUES
('aa110001-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', 'c1100001-0000-0000-0000-000000000001', 'Artwork', 5, 'Çift portresi çok dokunaklı, sanat tarihinin önemli bir parçası.', NULL, NULL, 17),
('aa110001-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', 'c1100001-0000-0000-0000-000000000001', 'Artwork', 4, 'Renkleri biraz daha doygun olabilirdi.', NULL, NULL, 5),
('aa110002-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-333333333333', 'c1100001-0000-0000-0000-000000000002', 'Artwork', 5, 'Tropikal sembolizm Frida''ya çok yakışıyor.', 'İlginiz için teşekkürler.', '2026-05-04 13:00:00', 21),
('aa110003-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-444444444444', 'c2200001-0000-0000-0000-000000000001', 'Artwork', 5, 'Pembe dönem hayranlarına müthiş bir parça.', NULL, NULL, 28),
('aa110003-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-555555555555', 'c2200001-0000-0000-0000-000000000001', 'Artwork', 4, 'Pahalı ama Picasso için makul.', NULL, NULL, 14),
('aa110004-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-666666666666', 'c2200001-0000-0000-0000-000000000003', 'Artwork', 5, 'El yapımı seramik kalitesi mükemmel.', NULL, NULL, 9),
('aa110005-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-777777777777', 'c3300001-0000-0000-0000-000000000001', 'Artwork', 5, 'Zambaklar tablosu odamı ışıklandırdı.', NULL, NULL, 33),
('aa110005-0000-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-888888888888', 'c3300001-0000-0000-0000-000000000001', 'Artwork', 5, 'Van Gogh sevenler kaçırmasın.', 'Tebrikler, eserin yeni sahibine kavuşması güzel.', '2026-05-06 09:30:00', 26),
('aa110006-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-999999999999', 'c3300001-0000-0000-0000-000000000003', 'Artwork', 4, 'Servi ağaçları manzarası huzur veriyor.', NULL, NULL, 12),
('aa110007-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'c4400001-0000-0000-0000-000000000001', 'Artwork', 5, 'Osmanlı içmekan tasviri muhteşem.', NULL, NULL, 15),
('aa110008-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'c4400001-0000-0000-0000-000000000004', 'Artwork', 5, 'Boğaz manzarası suluboya tekniğinde çok başarılı.', NULL, NULL, 11),
('aa110009-0000-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-cccccccccccc', 'c5500001-0000-0000-0000-000000000003', 'Artwork', 4, 'Uygun fiyatlı, başlangıç koleksiyonu için ideal.', NULL, NULL, 7);

-- Yeni eserlere favoriler
INSERT INTO Favorites (User_ID, Artwork_ID) VALUES
('ba111111-aaaa-bbbb-cccc-111111111111', 'c1100001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-222222222222', 'c2200001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-333333333333', 'c3300001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-444444444444', 'c1100001-0000-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-555555555555', 'c2200001-0000-0000-0000-000000000003'),
('ba111111-aaaa-bbbb-cccc-666666666666', 'c4400001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-777777777777', 'c3300001-0000-0000-0000-000000000003'),
('ba111111-aaaa-bbbb-cccc-888888888888', 'c4400001-0000-0000-0000-000000000004'),
('ba111111-aaaa-bbbb-cccc-999999999999', 'c5500001-0000-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'c5500001-0000-0000-0000-000000000003');


-- ============================================================
-- MEGA SEED: SUNUM İÇİN GENİŞ TEST VERİSİ (40+ ek eser, 50+ yorum)
-- ============================================================

-- Yeni sanatçılar (4 adet daha — toplam 8 sanatçı)
INSERT INTO Users (User_ID, First_Name, Last_Name, Email, Password_Hash, Role) VALUES
('aa222221-0000-0000-0000-000000000001', 'Claude', 'Monet', 'monet@galeri.com', 'hashed_pw_monet', 'Artist'),
('aa222221-0000-0000-0000-000000000002', 'Salvador', 'Dali', 'dali@galeri.com', 'hashed_pw_dali', 'Artist'),
('aa222221-0000-0000-0000-000000000003', 'Leonardo', 'da Vinci', 'davinci@galeri.com', 'hashed_pw_vinci', 'Artist'),
('aa222221-0000-0000-0000-000000000004', 'Henri', 'Matisse', 'matisse@galeri.com', 'hashed_pw_matisse', 'Artist');

INSERT INTO Artists (Artist_ID, User_ID, Full_Name, Biography, Birth_Date, Death_Date, Nationality) VALUES
('bb222221-0000-0000-0000-000000000001', 'aa222221-0000-0000-0000-000000000001', 'Claude Monet', 'Empresyonizmin kurucularından, doğa manzaralarıyla ünlü.', '1840-11-14', '1926-12-05', 'Fransız'),
('bb222221-0000-0000-0000-000000000002', 'aa222221-0000-0000-0000-000000000002', 'Salvador Dali', 'Sürrealizmin en tanınmış temsilcilerinden.', '1904-05-11', '1989-01-23', 'İspanyol'),
('bb222221-0000-0000-0000-000000000003', 'aa222221-0000-0000-0000-000000000003', 'Leonardo da Vinci', 'Rönesansın çok yönlü dehası.', '1452-04-15', '1519-05-02', 'İtalyan'),
('bb222221-0000-0000-0000-000000000004', 'aa222221-0000-0000-0000-000000000004', 'Henri Matisse', 'Fovizmin öncüsü, renk ustası.', '1869-12-31', '1954-11-03', 'Fransız');

-- 30 YENİ ESER (Monet, Dali, da Vinci, Matisse + ek)
INSERT INTO Artworks (Artwork_ID, Artist_ID, Title, Description, Price, Category, Image_URL, Stock_Status, View_Count, Like_Count, Is_Campaign, Campaign_Discount_Percent) VALUES
-- Monet (8 eser)
('d1000001-1111-0000-0000-000000000001', 'bb222221-0000-0000-0000-000000000001', 'Nilüfer Havuzu', 'Giverny''deki ünlü bahçeden empresyonist manzara.', 145000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800', 'Available', 234, 56, FALSE, 0),
('d1000001-1111-0000-0000-000000000002', 'bb222221-0000-0000-0000-000000000001', 'Gün Doğumu İzlenimi', 'Empresyonizm akımına adını veren tablo.', 195000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800', 'Available', 412, 89, TRUE, 18),
('d1000001-1111-0000-0000-000000000003', 'bb222221-0000-0000-0000-000000000001', 'Rouen Katedrali', 'Katedral serisinden bir parça, ışık çalışması.', 165000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800', 'Available', 178, 34, FALSE, 0),
('d1000001-1111-0000-0000-000000000004', 'bb222221-0000-0000-0000-000000000001', 'Saman Yığınları', 'Mevsim değişimlerini yansıtan seri.', 125000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800', 'Available', 156, 28, FALSE, 0),
('d1000001-1111-0000-0000-000000000005', 'bb222221-0000-0000-0000-000000000001', 'Japon Köprüsü', 'Bahçedeki köprü, yeşil tonlarda.', 138000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1564399580875-451a5d44ec08?w=800', 'Available', 145, 31, TRUE, 15),
('d1000001-1111-0000-0000-000000000006', 'bb222221-0000-0000-0000-000000000001', 'Argenteuil Sandalları', 'Nehir ve sandallar, açık hava.', 98000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', 'Sold', 198, 42, FALSE, 0),
('d1000001-1111-0000-0000-000000000007', 'bb222221-0000-0000-0000-000000000001', 'Suluboya Etüt', 'Hızlı kompozisyon eskizi.', 8500.00, 'Suluboya', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800', 'Available', 67, 14, FALSE, 0),
('d1000001-1111-0000-0000-000000000008', 'bb222221-0000-0000-0000-000000000001', 'Çiçekli Tarla', 'İlkbahar manzarası, polikrom.', 75000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', 'Available', 123, 26, FALSE, 0),

-- Dali (7 eser)
('d2000001-2222-0000-0000-000000000001', 'bb222221-0000-0000-0000-000000000002', 'Hafızanın Sürekliliği', 'Eriyen saatlerle ünlü sürrealist eser.', 285000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', 'Available', 645, 142, TRUE, 22),
('d2000001-2222-0000-0000-000000000002', 'bb222221-0000-0000-0000-000000000002', 'Filler', 'Uzun bacaklı filler, sürreal kompozisyon.', 195000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=800', 'Available', 312, 67, FALSE, 0),
('d2000001-2222-0000-0000-000000000003', 'bb222221-0000-0000-0000-000000000002', 'Galatea of the Spheres', 'Atomik dönemden küresel kompozisyon.', 165000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800', 'Available', 245, 51, FALSE, 0),
('d2000001-2222-0000-0000-000000000004', 'bb222221-0000-0000-0000-000000000002', 'Surreal Heykel', 'Bronz heykel, sürrealist form.', 88000.00, 'Heykel', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', 'Available', 134, 28, TRUE, 10),
('d2000001-2222-0000-0000-000000000005', 'bb222221-0000-0000-0000-000000000002', 'Eskiz Defterinden', 'Karakalem sürreal denemeler.', 12000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', 'Available', 78, 15, FALSE, 0),
('d2000001-2222-0000-0000-000000000006', 'bb222221-0000-0000-0000-000000000002', 'Bıyıklı Otoportre', 'Sanatçının ünlü kimliğiyle otoportre.', 145000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1578321272125-4e4c4c3643c5?w=800', 'Available', 287, 62, FALSE, 0),
('d2000001-2222-0000-0000-000000000007', 'bb222221-0000-0000-0000-000000000002', 'Mini Sürrealist', 'Küçük boyutlu giriş seviyesi eser.', 4800.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800', 'Available', 42, 9, TRUE, 20),

-- da Vinci (8 eser)
('d3000001-3333-0000-0000-000000000001', 'bb222221-0000-0000-0000-000000000003', 'Mona Lisa Reprodüksiyon', 'Müze kalitesinde el yapımı kopya.', 175000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800', 'Available', 892, 198, TRUE, 25),
('d3000001-3333-0000-0000-000000000002', 'bb222221-0000-0000-0000-000000000003', 'Son Akşam Yemeği Detay', 'Ünlü duvar resminin detay reprodüksiyonu.', 145000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1606819717115-9159c900370b?w=800', 'Available', 567, 124, FALSE, 0),
('d3000001-3333-0000-0000-000000000003', 'bb222221-0000-0000-0000-000000000003', 'Vitruvius Adamı', 'Anatomi çalışmasının el yapımı reprodüksiyonu.', 85000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', 'Available', 423, 89, FALSE, 0),
('d3000001-3333-0000-0000-000000000004', 'bb222221-0000-0000-0000-000000000003', 'Anatomi Eskizleri', 'Rönesans çağı bilimsel eskizler.', 35000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800', 'Available', 156, 34, TRUE, 12),
('d3000001-3333-0000-0000-000000000005', 'bb222221-0000-0000-0000-000000000003', 'Bronz Heykel Çalışması', 'Klasik dönem heykel reprodüksiyonu.', 58000.00, 'Heykel', 'https://images.unsplash.com/photo-1597274303632-880ef8660375?w=800', 'Available', 234, 51, FALSE, 0),
('d3000001-3333-0000-0000-000000000006', 'bb222221-0000-0000-0000-000000000003', 'Mekanik Tasarım Eskiz', 'Sanatçının mekanik dehasını yansıtan çizimler.', 22000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1502691876148-a84978e59af8?w=800', 'Available', 145, 31, FALSE, 0),
('d3000001-3333-0000-0000-000000000007', 'bb222221-0000-0000-0000-000000000003', 'Madonna Detay', 'Madonna serisinden bir bölüm.', 95000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=800', 'Sold', 312, 78, FALSE, 0),
('d3000001-3333-0000-0000-000000000008', 'bb222221-0000-0000-0000-000000000003', 'Karakalem Portre', 'Klasik karakalem teknik gösterimi.', 6500.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', 'Available', 67, 14, TRUE, 15),

-- Matisse (7 eser)
('d4000001-4444-0000-0000-000000000001', 'bb222221-0000-0000-0000-000000000004', 'Dans', 'Ünlü dansçılar kompozisyonu.', 178000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 'Available', 423, 92, TRUE, 18),
('d4000001-4444-0000-0000-000000000002', 'bb222221-0000-0000-0000-000000000004', 'Kırmızı Stüdyo', 'İç mekan kırmızı tonlarda.', 145000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800', 'Available', 287, 56, FALSE, 0),
('d4000001-4444-0000-0000-000000000003', 'bb222221-0000-0000-0000-000000000004', 'Mavi Çıplaklar', 'Kağıt kesim sanatından bir parça.', 95000.00, 'Karma Teknik', 'https://images.unsplash.com/photo-1518518873111-6ca469aa4560?w=800', 'Available', 198, 45, FALSE, 0),
('d4000001-4444-0000-0000-000000000004', 'bb222221-0000-0000-0000-000000000004', 'Açık Pencere', 'Akdeniz manzarası, fovist tarz.', 125000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800', 'Available', 234, 48, TRUE, 12),
('d4000001-4444-0000-0000-000000000005', 'bb222221-0000-0000-0000-000000000004', 'Goldfish', 'Akvaryum natürmort.', 85000.00, 'Yağlı Boya', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800', 'Available', 167, 35, FALSE, 0),
('d4000001-4444-0000-0000-000000000006', 'bb222221-0000-0000-0000-000000000004', 'Heykel Etüdü', 'Kadın figürü bronz çalışması.', 65000.00, 'Heykel', 'https://images.unsplash.com/photo-1597274303632-880ef8660375?w=800', 'Available', 134, 28, FALSE, 0),
('d4000001-4444-0000-0000-000000000007', 'bb222221-0000-0000-0000-000000000004', 'Mini Fovist', 'Renk denemeleri küçük format.', 3800.00, 'Akrilik', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 'Available', 56, 12, TRUE, 25);

-- EK ETKİNLİKLER (4 yeni atölye, çeşitli)
INSERT INTO Events (Event_ID, Organizer_ID, Title, Description, Event_Date, Capacity, Price, Image_URL, View_Count, Is_Campaign) VALUES
('e1111111-2222-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Empresyonist Resim Atölyesi', 'Monet tarzında manzara çalışması, ileri seviye.', '2026-07-26 11:00:00', 10, 520.00, 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800', 156, TRUE),
('e1111111-2222-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Sürrealist Sanat Semineri', 'Dali ve sürrealizm akımı incelemesi.', '2026-08-02 14:00:00', 40, 180.00, 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800', 289, FALSE),
('e1111111-2222-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Klasik Portre Atölyesi', 'Rönesans tekniklerinde portre çalışması.', '2026-08-09 13:00:00', 8, 680.00, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800', 134, FALSE),
('e1111111-2222-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'Renk Teorisi Workshopu', 'Fovizm ve renk uyumu üzerine pratik.', '2026-08-16 10:00:00', 15, 420.00, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 198, TRUE);

-- 40+ EK YORUM (yeni eserlere)
INSERT INTO Reviews (Review_ID, User_ID, Target_ID, Target_Type, Rating, Comment_Text, Reply_Text, Replied_At, Helpful_Votes) VALUES
-- Monet eserlerine
('aaa00001-1111-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-111111111111', 'd1000001-1111-0000-0000-000000000001', 'Artwork', 5, 'Nilüfer havuzu manzarası gerçekten huzur veriyor, salonumun başyapıtı oldu.', NULL, NULL, 24),
('aaa00001-1111-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-222222222222', 'd1000001-1111-0000-0000-000000000001', 'Artwork', 5, 'Empresyonist tarzın en güzel örneklerinden.', 'Çok teşekkürler, evinizde olduğunu duymak mutluluk verici.', '2026-05-10 11:00:00', 18),
('aaa00001-1111-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-333333333333', 'd1000001-1111-0000-0000-000000000002', 'Artwork', 5, 'Empresyonizmin başlangıç noktası, tarih kokuyor.', NULL, NULL, 31),
('aaa00001-1111-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-444444444444', 'd1000001-1111-0000-0000-000000000002', 'Artwork', 4, 'Çok güzel ama biraz pahalı geldi.', NULL, NULL, 8),
('aaa00001-1111-0000-0000-000000000005', 'ba111111-aaaa-bbbb-cccc-555555555555', 'd1000001-1111-0000-0000-000000000003', 'Artwork', 5, 'Katedralin ışık-gölge çalışması müthiş.', NULL, NULL, 22),
('aaa00001-1111-0000-0000-000000000006', 'ba111111-aaaa-bbbb-cccc-666666666666', 'd1000001-1111-0000-0000-000000000005', 'Artwork', 4, 'Japon köprüsü serene atmosferiyle harika.', NULL, NULL, 12),

-- Dali eserlerine
('aaa00002-2222-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-777777777777', 'd2000001-2222-0000-0000-000000000001', 'Artwork', 5, 'Hafızanın sürekliliği insanı düşündürüyor, mükemmel eser.', 'İlginiz için teşekkürler.', '2026-05-11 14:30:00', 45),
('aaa00002-2222-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-888888888888', 'd2000001-2222-0000-0000-000000000001', 'Artwork', 5, 'Eriyen saatler ikonik bir görsel.', NULL, NULL, 38),
('aaa00002-2222-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-999999999999', 'd2000001-2222-0000-0000-000000000001', 'Artwork', 4, 'Pahalı ama Dali için makul.', NULL, NULL, 19),
('aaa00002-2222-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'd2000001-2222-0000-0000-000000000002', 'Artwork', 5, 'Uzun bacaklı filler sürrealizmin doruk noktası.', NULL, NULL, 28),
('aaa00002-2222-0000-0000-000000000005', 'ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'd2000001-2222-0000-0000-000000000004', 'Artwork', 5, 'Heykel kalitesi inanılmaz, salon tamamlandı.', NULL, NULL, 16),

-- da Vinci eserlerine
('aaa00003-3333-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-cccccccccccc', 'd3000001-3333-0000-0000-000000000001', 'Artwork', 5, 'Mona Lisa reprodüksiyonu müze kalitesinde.', NULL, NULL, 67),
('aaa00003-3333-0000-0000-000000000002', 'a4444444-4444-4444-4444-444444444444', 'd3000001-3333-0000-0000-000000000001', 'Artwork', 5, 'Detaylar muhteşem, kampanya fiyatına aldım çok memnunum.', 'Memnuniyetinizi paylaşmanız değerli.', '2026-05-12 09:45:00', 52),
('aaa00003-3333-0000-0000-000000000003', 'a5555555-5555-5555-5555-555555555555', 'd3000001-3333-0000-0000-000000000002', 'Artwork', 5, 'Son Akşam Yemeği detayı çok güçlü bir kompozisyon.', NULL, NULL, 41),
('aaa00003-3333-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-111111111111', 'd3000001-3333-0000-0000-000000000003', 'Artwork', 5, 'Vitruvius adamı klasik sanat sevenler için ideal.', NULL, NULL, 33),
('aaa00003-3333-0000-0000-000000000005', 'ba111111-aaaa-bbbb-cccc-222222222222', 'd3000001-3333-0000-0000-000000000004', 'Artwork', 4, 'Anatomi eskizleri bilimsel ve sanatsal mükemmel birleşim.', NULL, NULL, 18),
('aaa00003-3333-0000-0000-000000000006', 'ba111111-aaaa-bbbb-cccc-333333333333', 'd3000001-3333-0000-0000-000000000005', 'Artwork', 4, 'Bronz heykel kalitesi yüksek.', NULL, NULL, 11),

-- Matisse eserlerine
('aaa00004-4444-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-444444444444', 'd4000001-4444-0000-0000-000000000001', 'Artwork', 5, 'Dans kompozisyonu hareket ve renk muhteşem.', NULL, NULL, 36),
('aaa00004-4444-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-555555555555', 'd4000001-4444-0000-0000-000000000001', 'Artwork', 5, 'Salonum canlandı, herkesin ilk gördüğü eser.', 'Çok teşekkürler!', '2026-05-13 16:20:00', 29),
('aaa00004-4444-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-666666666666', 'd4000001-4444-0000-0000-000000000002', 'Artwork', 4, 'Kırmızı tonlar etkileyici, atmosfer sıcak.', NULL, NULL, 17),
('aaa00004-4444-0000-0000-000000000004', 'ba111111-aaaa-bbbb-cccc-777777777777', 'd4000001-4444-0000-0000-000000000003', 'Artwork', 5, 'Mavi çıplaklar zarafetin görsel ifadesi.', NULL, NULL, 24),
('aaa00004-4444-0000-0000-000000000005', 'ba111111-aaaa-bbbb-cccc-888888888888', 'd4000001-4444-0000-0000-000000000004', 'Artwork', 4, 'Açık pencere fovist tarzın güzel örneği.', NULL, NULL, 14),

-- Yeni etkinliklere yorumlar
('aaa00005-5555-0000-0000-000000000001', 'ba111111-aaaa-bbbb-cccc-999999999999', 'e1111111-2222-0000-0000-000000000001', 'Event', 5, 'Empresyonist atölye harika geçti, eğitmen çok ilgili.', NULL, NULL, 13),
('aaa00005-5555-0000-0000-000000000002', 'ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'e1111111-2222-0000-0000-000000000002', 'Event', 5, 'Sürrealizm semineri çok bilgilendiriciydi.', NULL, NULL, 9),
('aaa00005-5555-0000-0000-000000000003', 'ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'e1111111-2222-0000-0000-000000000004', 'Event', 4, 'Renk teorisi pratiği faydalıydı.', NULL, NULL, 7);

-- EK FAVORİLER (15 adet)
INSERT INTO Favorites (User_ID, Artwork_ID) VALUES
('ba111111-aaaa-bbbb-cccc-111111111111', 'd2000001-2222-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-222222222222', 'd3000001-3333-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-333333333333', 'd1000001-1111-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-444444444444', 'd4000001-4444-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-555555555555', 'd2000001-2222-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-666666666666', 'd1000001-1111-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-777777777777', 'd3000001-3333-0000-0000-000000000001'),
('ba111111-aaaa-bbbb-cccc-888888888888', 'd4000001-4444-0000-0000-000000000003'),
('ba111111-aaaa-bbbb-cccc-999999999999', 'd2000001-2222-0000-0000-000000000003'),
('ba111111-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'd1000001-1111-0000-0000-000000000005'),
('ba111111-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'd3000001-3333-0000-0000-000000000002'),
('ba111111-aaaa-bbbb-cccc-cccccccccccc', 'd4000001-4444-0000-0000-000000000002'),
('a4444444-4444-4444-4444-444444444444', 'd2000001-2222-0000-0000-000000000001'),
('a5555555-5555-5555-5555-555555555555', 'd3000001-3333-0000-0000-000000000001'),
('22222222-2222-2222-2222-222222222222', 'd1000001-1111-0000-0000-000000000001');
