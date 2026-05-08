const { Pool } = require('pg');
require('dotenv').config(); //env dosyasını yükle

// Pool oluştur
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 
pool.connect()
  .then(() => console.log(' Veritabanına başarıyla bağlanıldı.'))
  .catch(err => {
      console.error('❌ Veritabanı bağlantı hatası!', err.message);
      process.exit(1); 
  });

module.exports = pool;