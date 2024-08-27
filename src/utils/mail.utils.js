import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const sendMail = async(email, randomNum) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: false,
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS, 
            }
        });
        await transporter.sendMail({ 
            from: process.env.SMTP_USER, 
            to: email,
            subject: 'Test',
            text: 'Random number: ' + randomNum + ' (This number will be expired in 10 minutes)'
        });
        return true
    } 
    catch (err) {
        console.error('Loi khi gui mail:', err);
        return false
    }
}

export default {sendMail}