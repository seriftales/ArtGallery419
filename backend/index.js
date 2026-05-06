require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db'); // Veritabanı bağlantısını tetikler

const app = express();
// Gelen isteklerin gövdesindeki (body) JSON verilerini okuyabilmemizi sağlar
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});