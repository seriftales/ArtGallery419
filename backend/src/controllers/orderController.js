const pool = require('../config/db.js'); 

// Sipariş Oluşturma 
const createOrder = async (req, res) => {
    const userId = req.user.userId;
    const { artworkId, paymentMethod } = req.body;

    if (!artworkId || !paymentMethod) {
        return res.status(400).json({ error: "Eser ID ve Ödeme Yöntemi zorunludur." });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const artworkQuery = await client.query(
            "SELECT Price, Stock_Status FROM Artworks WHERE Artwork_ID = $1 FOR UPDATE",
            [artworkId]
        );

        if (artworkQuery.rows.length === 0) {
            throw new Error("Satın alınmak istenen eser galeride bulunamadı.");
        }

        const artwork = artworkQuery.rows[0];

        if (artwork.stock_status !== 'Available') {
            throw new Error("Bu eser zaten satılmış veya şu an rezerve durumda.");
        }

        const orderQuery = await client.query(
            `INSERT INTO Orders (User_ID, Total_Amount, Payment_Method, Status) 
             VALUES ($1, $2, $3, 'Completed') RETURNING Order_ID`,
            [userId, artwork.price, paymentMethod]
        );
        const newOrderId = orderQuery.rows[0].order_id;

        await client.query(
            `INSERT INTO Order_Items (Order_ID, Artwork_ID, Price_At_Purchase) 
             VALUES ($1, $2, $3)`,
            [newOrderId, artworkId, artwork.price]
        );

        await client.query(
            "UPDATE Artworks SET Stock_Status = 'Sold' WHERE Artwork_ID = $1",
            [artworkId]
        );

        await client.query('COMMIT');

        res.status(201).json({ 
            success: true, 
            message: "Ödeme alındı, sipariş başarıyla oluşturuldu.",
            orderId: newOrderId 
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Sipariş hatası:", error.message);
        
        const statusCode = error.message.includes("bulunamadı") || error.message.includes("satılmış") ? 400 : 500;
        res.status(statusCode).json({ error: error.message || "Sipariş işlemi başarısız." });
    } finally {
        client.release();
    }
};

//Sipariş Geçmişi Görüntüleme
const getMyOrders = async (req, res) => {
    const userId = req.user.userId;

    try {
        const query = `
            SELECT 
                o.Order_ID, 
                o.Total_Amount, 
                o.Status, 
                TO_CHAR(o.Created_At, 'YYYY-MM-DD HH24:MI') as Order_Date,
                oi.Price_At_Purchase,
                a.Title as Artwork_Title,
                a.Image_URL
            FROM Orders o
            INNER JOIN Order_Items oi ON o.Order_ID = oi.Order_ID
            INNER JOIN Artworks a ON oi.Artwork_ID = a.Artwork_ID
            WHERE o.User_ID = $1
            ORDER BY o.Created_At DESC
        `;

        const { rows } = await pool.query(query, [userId]);

        res.status(200).json({ 
            success: true, 
            count: rows.length, 
            data: rows 
        });
    } catch (error) {
        console.error("Sipariş geçmişi çekilirken hata:", error.message);
        res.status(500).json({ error: "Siparişler getirilemedi." });
    }
};

module.exports = { 
    createOrder, 
    getMyOrders };