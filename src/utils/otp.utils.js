import database from '../config/db.js';
const saveOTP = async (email, otp) => {
    try {
        const expiryTime = Date.now() + 3600000;
        const expirationDate = new Date(expiryTime);

        const formattedDate = expirationDate.getFullYear() + '-' +
            ('0' + (expirationDate.getMonth() + 1)).slice(-2) + '-' +
            ('0' + expirationDate.getDate()).slice(-2) + ' ' +
            ('0' + expirationDate.getHours()).slice(-2) + ':' +
            ('0' + expirationDate.getMinutes()).slice(-2) + ':' +
            ('0' + expirationDate.getSeconds()).slice(-2);   
        
        const [findOne] = await database.pool.query(`SELECT * FROM otp WHERE email = ?`, [email]);
        if (findOne[0].length === 0) {
            await database.pool.query(`INSERT INTO otp(email, otp, EXP) VALUES (?, ?, ?)`, [email, otp, formattedDate]);
        } else {
            await database.pool.query(`UPDATE otp SET otp = ?, EXP = ? WHERE email = ?`, [otp, formattedDate, email]);
        }
        return true
    } 
    catch (error) {
        console.error('Error inserting OTP:', error);
        return false;
    }
}

export default {saveOTP};