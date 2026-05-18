const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Public istatistikler (ana sayfa için)
router.get('/public', async (req, res) => {
    try {
        const [artworks, artists, events, customers] = await Promise.all([
            pool.query("SELECT COUNT(*) as total FROM Artworks"),
            pool.query("SELECT COUNT(*) as total FROM Artists"),
            pool.query("SELECT COUNT(*) as total FROM Events"),
            pool.query("SELECT COUNT(*) as total FROM Users WHERE role = 'Customer'")
        ]);
        res.status(200).json({
            success: true,
            data: {
                totalArtworks: parseInt(artworks.rows[0].total),
                totalArtists: parseInt(artists.rows[0].total),
                totalEvents: parseInt(events.rows[0].total),
                totalCustomers: parseInt(customers.rows[0].total)
            }
        });
    } catch (error) {
        res.status(500).json({ error: "İstatistikler alınamadı." });
    }
});

module.exports = router;
