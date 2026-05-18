require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db'); // Veritabanı bağlantısı
const path = require('path'); 

const app = express();

const corsOptions = {

    //Frontend calıstığı adres 
    origin: 'http://localhost:3000', 
    
    //İzin verilen methodlar
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    
    //Token ve Cookie paylaşma izinleri
    credentials: true,
    
    //İzin verilen headerlar
    allowedHeaders: ['Content-Type', 'Authorization'] 
};

app.use(cors(corsOptions)); 

app.use(express.json()); //Body Parser


//ROTALAR : 
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

const ticketRoutes = require('./src/routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

const statsRoutes = require('./src/routes/statsRoutes');
app.use('/api/stats', statsRoutes);


//Test Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'ArtGallery419 API ayakta ve PostgreSQL dinlemede!',
        timestamp: new Date()
    });
});

//Server Başlatma
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});