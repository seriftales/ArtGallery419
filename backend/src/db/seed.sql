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