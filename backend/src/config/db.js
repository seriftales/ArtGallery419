const { Pool } = require('pg');
require('dotenv').config(); // .env dosyasındaki gizli değişkenleri okumak için

// Bağlantı havuzunu .env'den gelen verilerle oluşturuyoruz
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Sunucu kalkarken veritabanı bağlantısını anında test eden senior dokunuşu
pool.connect()
  .then(() => console.log('✅ PostgreSQL Veritabanına başarıyla bağlanıldı.'))
  .catch(err => {
      console.error('❌ Veritabanı bağlantı hatası! Bilgilerinizi kontrol edin:', err.message);
      process.exit(1); // Veritabanı yoksa sunucuyu boşuna çalıştırma, durdur.
  });

module.exports = pool;