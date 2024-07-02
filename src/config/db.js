import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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

export default pool;
