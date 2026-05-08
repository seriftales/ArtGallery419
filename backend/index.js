require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db'); // Veritabanı bağlantısını tetikler
const path = require('path'); // Sayfanın en üstüne import etmeyi unutma

const app = express();
app.get('/ping', (req, res) => {
    console.log("PING GELDİ! Sunucu hayatta.");
    res.status(200).send("PONG - Sunucu Çalışıyor!");
});

app.use(express.json()); 
app.use(cors()); // Tüm dış isteklere izin ver


//router tanımları 
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./src/routes/userRoutes');
app.use('/api/user', userRoutes);

const artworkRoutes = require('./src/routes/artworkRoutes');
app.use('/api/artworks', artworkRoutes); 

const favoriteRoutes = require('./src/routes/favoriteRoutes');
app.use('/api/favorites', favoriteRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const eventRoutes = require('./src/routes/eventRoutes');
app.use('/api/events', eventRoutes);

const reservationRoutes = require('./src/routes/reservationRoutes');
app.use('/api/reservations', reservationRoutes);

const orderRoutes = require('./src/routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const comparisonRoutes = require('./src/routes/comparisonRoutes');
app.use('/api/comparisons', comparisonRoutes);

const reviewRoutes = require('./src/routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

const adminRoutes = require('./src/routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const couponRoutes = require('./src/routes/couponRoutes');
app.use('/api/coupons', couponRoutes);



// --- MIDDLEWARES (Ara Katmanlar) ---
// Frontend'in (Farklı port) backend'e istek atabilmesi için güvenlik kilidini açar
app.use(cors()); 


// --- TEST ENDPOINT'İ ---
// Sistemin çalışıp çalışmadığını kontrol etmek için basit bir rota
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'ArtGallery419 API ayakta ve PostgreSQL dinlemede!',
        timestamp: new Date()
    });
});

// --- SUNUCUYU BAŞLATMA ---
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});