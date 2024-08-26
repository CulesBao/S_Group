import database from '../config/db.js'
import hashUtils from '../utils/hash.utils.js'
import otpUtils from '../utils/otp.utils.js'
import regexUtils from '../utils/regex.utils.js'
import mailUtils from '../utils/mail.utils.js'
import tokenUtils from '../utils/token.utils.js'

import dotenv from 'dotenv'
dotenv.config()

const register = async(user) => {
    try{
        const hashPassword = await hashUtils.hashPassword(user.password)
        const [findUser] = await database.pool.query(`SELECT * FROM users WHERE username = ?`, [user.username])
        if (findUser.length != 0)
            return {
                status: 400,
                message: 'Username is already existed'
            }
        else{
            database.pool.query(`INSERT INTO users(email, username, password) VALUES (?, ?, ?)`, [user.email, user.username, hashPassword])
            return {
                status: 200,
                message: 'Register completed'
            }
        }
    }
    catch(err) {
        console.log("Loi o service", err)
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
}

const login = async(user) => {
    try{
        const [rows] = await database.pool.query(`SELECT * FROM users WHERE username = ?`, [user.username]);
        const password = rows[0]?.password
        const id = rows[0]?.id
        let user = rows[0]

        if (password && await hashUtils.comparePassword(user.password, password)){
            const token = tokenUtils.createToken(user)
            return {
                status: 200,
                message: 'Login completed',
                token: token,
                id: id, 
                user: rows[0]
            }
        }
        else{
            return {
                status: 400,
                message: 'Login failed'
            }
        }
    }
    catch(err) {
        console.log("Loi o service", err)
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
}

const forgotPassword = async(email) => {
    try{
        let randomNum = regexUtils.randomNum(6)
        await otpUtils.saveOTP(email, randomNum)
        let sendEmail = await mailUtils.sendMail(email, randomNum)

        return sendEmail
    }
    catch(err) {
        console.log("Loi o service", err)
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
}

const resetPassword = async(email, password) => {
    try{
        let hashPassword = await hashUtils.hashPassword(password)
        await database.pool.query(`UPDATE users SET password = ? WHERE email = ?`, [hashPassword, email])
        return {
            status: 200,
            message: 'Password was changed'
        }
    }
    catch(err) {
        console.log("Loi o service", err)
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
}

export default {register, login, forgotPassword, resetPassword}

