import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL!');
        connection.release();
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
    }
}

testConnection();

const saveOTP = async (email, otp, time) => {
    const connection = await pool.getConnection();
    try {
        const findOne = await connection.query(`SELECT * FROM otp WHERE email = ?`, [email]);
        if (findOne[0].length === 0) {
            await connection.query(`INSERT INTO otp(email, otp, EXP) VALUES (?, ?, ?)`, [email, otp, time]);
        } else {
            await connection.query(`UPDATE otp SET otp = ?, EXP = ? WHERE email = ?`, [otp, time, email]);
        }
        console.log('Replace OTP:', otp);
    } catch (error) {
        console.error('Error inserting OTP:', error);
    } finally {
        connection.release();
    }
}

export default {pool, saveOTP};