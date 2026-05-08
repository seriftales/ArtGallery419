const multer = require('multer');
const path = require('path');

// 1. Depolama Motoru Ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 2. Dosya Türü ve Boyutu Kontrolü
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

// 3. Multer Middleware'i Oluşturma
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5 MB sınırı
    fileFilter: fileFilter
});

module.exports = upload;