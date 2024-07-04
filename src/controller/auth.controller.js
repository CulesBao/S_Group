import authService from '../services/auth.service.js'
import middleware from '../middleware/auth.middleware.js'
import mailUtils from '../utils/mail.utils.js'
import database from '../config/db.js'
import hashUtils from '../utils/hash.utils.js'

const register = async (req, res) => {
    try{
        let user = req.body
        let register = await authService.register(user)
        if (register == true)
            res.status(201).json("Register completed")
        else
            res.status(400).json("Username is already existed")
    }
    catch(err){
        res.json("Err", err)
    }
}

const login = async(req, res) => {
    try{
        let user = req.body
        let login = await authService.login(user)
        if (login)
            res.status(200).json('Login completed. Here is your token: ' + login)
        else
            res.status(400).json("Wrong username or password, please try again")
    }
    catch(err){
        res.status(400).json('Err ', err)
    }
}

const forgotPassword = async(req, res) => {
    try{
        let email = req.body.email
        let result = await authService.isThereExistedEmail(email)
        if (result){
            let randomNum = middleware.randomNum(6)
            console.log(randomNum)


            const expiryTime = Date.now() + 3600000;
            const expirationDate = new Date(expiryTime);

            const formattedDate = expirationDate.getFullYear() + '-' +
                ('0' + (expirationDate.getMonth() + 1)).slice(-2) + '-' +
                ('0' + expirationDate.getDate()).slice(-2) + ' ' +
                ('0' + expirationDate.getHours()).slice(-2) + ':' +
                ('0' + expirationDate.getMinutes()).slice(-2) + ':' +
                ('0' + expirationDate.getSeconds()).slice(-2);   
            await database.saveOTP(email, randomNum, formattedDate)
            let send = await mailUtils.sendMail(email, randomNum)
            if (send){
                res.status(200).json('Mail was sent to ' + email)
            }
            else
                res.status(400).json('Error when send email')
        }
        else{
            res.status(400).json('Email does not existed')
        }
    }
    catch(err){
        console.log('Loi o controller', err)
        res.status(400).json('Error ', err)
    }
}

const resetPassword = async(req, res) => {
    try{
        let email = req.body.email
        let otp = req.body.otp
        let password = req.body.password

        let checkOTP = await middleware.checkOTP(email, otp)
        console.log('Check OTP:', checkOTP)
        if (checkOTP){
            let hashPassword = await hashUtils.hashPassword(password)
            await database.pool.query(`UPDATE users SET password = ? WHERE email = ?`, [hashPassword, email])
            res.status(200).json('Password was changed')
        }else{
            res.status(400).json('OTP is wrong or expired')
        }
    }
    catch(err){
        console.log('Loi o controller', err)
        res.status(400).json('Error ', err)
    }
}

export default {register, login, forgotPassword, resetPassword}