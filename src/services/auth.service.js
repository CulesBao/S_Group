import database from '../config/db.js'
import hashUtils from '../utils/hash.utils.js'
import otpUtils from '../utils/otp.utils.js'
import regexUtils from '../utils/regex.utils.js'
import mailUtils from '../utils/mail.utils.js'
import tokenUtils from '../utils/token.utils.js'

import dotenv from 'dotenv'
dotenv.config()

const register = async(registerInfo) => {
    try{
        const [findEmail] = await database.pool.query(`SELECT * FROM users WHERE email = ?`, [registerInfo.email])
        if (findEmail.length != 0)
            return {
                status: 400,
                message: 'Email is already existed'
            }
        const [findOne] = await database.pool.query(`SELECT * FROM users WHERE username = ?`, [registerInfo.username])
        if (findOne.length != 0)
            return {
                status: 400,
                message: 'Username is already existed'
            }

        const hashPassword = await hashUtils.hashPassword(registerInfo.password)
        await database.pool.query(`INSERT INTO users(email, username, password) VALUES (?, ?, ?)`, [registerInfo.email, registerInfo.username, hashPassword])
        return {
            status: 200,
            message: 'Register completed'
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

const login = async(loginInfo) => {
    try{
        const [findOne] = await database.pool.query(`SELECT * FROM users WHERE username = ?`, [loginInfo.username]);
        let user = findOne[0]
        
        if (user && await hashUtils.comparePassword(loginInfo.password, user.password)){
            const token = tokenUtils.createToken(user)
            return {
                status: 200,
                message: 'Login completed',
                token: token,
                id: user.id, 
                email: user.email,
            }
        }
        else{
            return {
                status: 400,
                message: 'Login failed, wrong username or password'
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

const sendOTP = async(objInfo) => {
    try{
        const [findOne] = await database.pool.query(`SELECT * FROM users WHERE email = ?`, [objInfo.email])
        if (findOne.length == 0)
            return {
            status: 400,
            message: 'Can not found email'
        }
        let randomNum = regexUtils.randomNum(6)
        await otpUtils.saveOTP(objInfo.email, randomNum)
        let response = await mailUtils.sendMail(objInfo.email, randomNum)

        return (response? {
            status: 200,
            message: 'OTP was sent'
        } : {
            status: 500,
            message: 'Error when send email'
        })
    }
    catch(err) {
        console.log("Loi o service", err)
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
}

const resetPassword = async(objInfo) => {
    try{
        const [findOne] = await database.pool.query(`SELECT * FROM otp WHERE email = ?`, [objInfo.email])
        if (findOne.length == 0)
            return {
            status: 400,
            message: 'Can not found email'
        }
        else{
            const timeNow = Date.now() 
            const expTime = new Date(findOne[0].EXP).getTime()
            if (findOne[0].otp == objInfo.otp && expTime > timeNow){
                // Neu co the check coi mk cu co trung mk moi khong
                let hashPassword = await hashUtils.hashPassword(objInfo.password)
                await database.pool.query(`UPDATE users SET password = ? WHERE email = ?`, [hashPassword, objInfo.email])
                return {
                    status: 200,
                    message: 'Password was changed'
                }
            }
            else
                return {
                    status: 400,
                    message: 'OTP is expired'
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

export default {register, login, sendOTP, resetPassword}

