const multer = require('multer');
const path = require('path');

// 1. Depolama Motoru (Storage Engine) Ayarları
const storage = multer.diskStorage({
    // Dosyanın nereye kaydedileceğini belirliyoruz
    destination: (req, file, cb) => {
        // Not: Proje ana dizininde 'uploads' adında bir klasör oluşturmayı unutma!
        cb(null, 'uploads/'); 
    },
    // Dosyanın adını çakışmaları önlemek için benzersiz yapıyoruz
    filename: (req, file, cb) => {
        // Örn: image-168538291.jpg
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. Güvenlik Kalkanı: Sadece Resim Dosyalarına İzin Ver
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|webp/;
    // Hem uzantıyı hem de dosya tipini (mimetype) kontrol et
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Sadece resim dosyaları (jpeg, jpg, png, webp) yüklenebilir!'));
    }
};

// 3. Multer Objesini Oluştur ve Dışa Aktar
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5 MB sınırı
    fileFilter: fileFilter
});

module.exports = upload;