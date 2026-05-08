const pool = require('../config/db');

//Kullanıcı oluşturma 
const createUser = async (firstName, lastName, email, passwordHash, role) => {
    const query = `
        INSERT INTO Users (First_Name, Last_Name, Email, Password_Hash, Role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING User_ID, Email, First_Name;
    `;
    const values = [firstName, lastName, email, passwordHash, role];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

//Email ile kullanıcı bulma
const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM Users WHERE Email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
};

module.exports = { 
    createUser , 
    findUserByEmail};