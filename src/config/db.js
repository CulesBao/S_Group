import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users',
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
