const jwt = require('jsonwebtoken');

// Token doğrulama middleware'i
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: "Token gerekli, giriş yapmalısın!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        
        next(); 
    } catch (err) {
        return res.status(401).json({ error: "Geçersiz veya süresi dolmuş token!" });
    }
};

// Admin yetkisi kontrolü middleware'i
const isAdmin = (req, res, next) => {
    
    console.log("isAdmin middleware çalıştı. Kullanıcı rolü:", req.user.role); // Debug için ekledim

    if (req.user && req.user.role === 'Admin') {
        next(); 
    } else {
        return res.status(403).json({ error: "Erişim reddedildi. Bu işlem için Admin yetkisi gereklidir." });
    }
};

module.exports = { 
    verifyToken, 
    isAdmin };