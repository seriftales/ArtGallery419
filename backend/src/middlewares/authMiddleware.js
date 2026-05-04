const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. İstek başlığından (Header) token'ı al
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" formatını ayıklar

    if (!token) {
        return res.status(403).json({ error: "Token gerekli, giriş yapmalısın!" });
    }

    try {
        // 2. Token'ı bizim gizli anahtarımızla doğrula
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Token içindeki kullanıcı bilgilerini isteğe (req) ekle
        // Böylece sonraki fonksiyonlarda kimin istek attığını bileceğiz.
        req.user = decoded;
        
        next(); // Her şey yolunda, bir sonraki fonksiyona geçebilirsin
    } catch (err) {
        return res.status(401).json({ error: "Geçersiz veya süresi dolmuş token!" });
    }
};

module.exports = verifyToken;