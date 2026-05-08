const pool = require('../config/db');

// 1. Eser İstatistikleri
const getArtworkStats = async (req, res) => {
    try {
        // Senior Dokunuşu: LEFT JOIN kullanıyoruz ki hiç yorum almamış eserler de (0 olarak) listelensin.
        const query = `
            SELECT 
                a.Artwork_ID, 
                a.Title, 
                a.View_Count, 
                COUNT(r.Review_ID) as Total_Reviews,
                COALESCE(AVG(r.Rating), 0) as Average_Rating
            FROM Artworks a
            LEFT JOIN Reviews r ON a.Artwork_ID = r.Target_ID AND r.Target_Type = 'Artwork'
            GROUP BY a.Artwork_ID
            ORDER BY Total_Reviews DESC;
        `;
        const { rows } = await pool.query(query);
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ error: "Eser istatistikleri alınamadı." });
    }
};

// 2. Etkinlik İstatistikleri (Doluluk Oranı Hesaplama)
const getEventStats = async (req, res) => {
    try {
        const query = `
            SELECT 
                e.Event_ID, 
                e.Title, 
                e.Capacity,
                e.View_Count,
                COUNT(res.Reservation_ID) as Total_Reservations,
                -- Matematiksel Doluluk Oranı Yüzdesi
                ROUND((COUNT(res.Reservation_ID)::numeric / e.Capacity) * 100, 2) as Occupancy_Rate,
                COALESCE(AVG(r.Rating), 0) as Average_Rating
            FROM Events e
            LEFT JOIN Reservations res ON e.Event_ID = res.Event_ID AND res.Status = 'Confirmed'
            LEFT JOIN Reviews r ON e.Event_ID = r.Target_ID AND r.Target_Type = 'Event'
            GROUP BY e.Event_ID
        `;
        const { rows } = await pool.query(query);
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ error: "Etkinlik istatistikleri alınamadı." });
    }
};

// 3. Genel Özet Dashboard (Yönetici İçin)
const getDashboardSummary = async (req, res) => {
    try {
        // Promise.all ile veritabanına aynı anda (Paralel) 3 farklı sorgu fırlatıyoruz.
        const [users, orders, events] = await Promise.all([
            pool.query("SELECT COUNT(*) as total_users FROM Users"),
            pool.query("SELECT COUNT(*) as total_sales, SUM(Total_Amount) as total_revenue FROM Orders WHERE Status = 'Completed'"),
            pool.query("SELECT COUNT(*) as active_events FROM Events WHERE Event_Date >= CURRENT_DATE")
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalUsers: parseInt(users.rows[0].total_users),
                totalSales: parseInt(orders.rows[0].total_sales),
                totalRevenue: parseFloat(orders.rows[0].total_revenue) || 0,
                activeEvents: parseInt(events.rows[0].active_events)
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Dashboard özeti alınamadı." });
    }
};

// Rezervasyon Durumunu Güncelleme (Onaylama veya İptal Etme)
const updateReservationStatus = async (req, res) => {
    const { reservationId } = req.params;
    const { status } = req.body; // 'Confirmed' veya 'Cancelled' gönderilecek

    // Sadece belirli status değerlerine izin veriyoruz (Gümrük kontrolü)
    const allowedStatuses = ['Confirmed', 'Cancelled', 'Pending'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: "Geçersiz durum bilgisi." });
    }

    try {
        const result = await pool.query(
            "UPDATE Reservations SET Status = $1 WHERE Reservation_ID = $2 RETURNING *",
            [status, reservationId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Rezervasyon bulunamadı." });
        }

        res.status(200).json({ 
            success: true, 
            message: `Rezervasyon durumu ${status} olarak güncellendi.`, 
            data: result.rows[0] 
        });
    } catch (error) {
        console.error("Rezervasyon güncelleme hatası:", error.message);
        res.status(500).json({ error: "Güncelleme yapılamadı." });
    }
};

module.exports = { getArtworkStats, getEventStats, getDashboardSummary, updateReservationStatus };