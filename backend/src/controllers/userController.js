const pool = require('../config/db.js'); 
const bcrypt = require('bcryptjs');

// Profil Bilgilerini Güncelleme 
const updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { firstName, lastName, email } = req.body;

    try {
        if (email) {
            const emailCheck = await pool.query("SELECT * FROM Users WHERE Email = $1 AND User_ID != $2", [email, userId]);
            if (emailCheck.rows.length > 0) {
                return res.status(400).json({ error: "Bu e-posta adresi başka bir kullanıcı tarafından kullanılıyor." });
            }
        }

        const updatedUser = await pool.query(
            `UPDATE Users 
             SET First_Name = COALESCE($1, First_Name), 
                 Last_Name = COALESCE($2, Last_Name), 
                 Email = COALESCE($3, Email) 
             WHERE User_ID = $4 
             RETURNING User_ID, First_Name, Last_Name, Email, Role`,
            [firstName, lastName, email, userId]
        );

        res.status(200).json({ success: true, message: "Profil başarıyla güncellendi.", data: updatedUser.rows[0] });
    } catch (error) {
        console.error("Profil güncelleme hatası:", error.message);
        res.status(500).json({ error: "Sunucu hatası." });
    }
};

// Şifre Değiştirme
const changePassword = async (req, res) => {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Eski ve yeni şifre alanları zorunludur." });
    }

    try {
        const userQuery = await pool.query("SELECT Password_Hash FROM Users WHERE User_ID = $1", [userId]);
        const user = userQuery.rows[0];
        console.log("Kullanıcı verisi:", user);

        const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Mevcut şifreniz yanlış." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        await pool.query("UPDATE Users SET Password_Hash = $1 WHERE User_ID = $2", [hashedNewPassword, userId]);

        res.status(200).json({ success: true, message: "Şifreniz başarıyla değiştirildi." });
    } catch (error) {
        console.error("Şifre değiştirme hatası:", error.message);
        res.status(500).json({ error: "Sunucu hatası." });
    }
};

module.exports = { 
    updateProfile, 
    changePassword };