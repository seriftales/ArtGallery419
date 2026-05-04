const jwt = require('jsonwebtoken'); // En tepeye ekle
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Kullanıcıyı bul
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "E-posta veya şifre hatalı!" });
        }

        // 2. Şifreyi karşılaştır (Girilen vs Veritabanındaki Hash)
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "E-posta veya şifre hatalı!" });
        }

        // 3. Token oluştur (Kullanıcı ID ve Rolünü içine gömüyoruz)
        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // 1 saat sonra kartın süresi dolar
        );

        res.status(200).json({ 
            message: "Giriş başarılı!", 
            token, 
            user: { id: user.user_id, firstName: user.first_name, role: user.role } 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        
        // 1. Şifreyi güvenli hale getir
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 2. Veritabanına kaydet
        const newUser = await userService.createUser(firstName, lastName, email, passwordHash, role);

        res.status(201).json({ message: "Kayıt başarılı!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = { register , login};