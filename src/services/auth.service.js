import database from '../config/db.js'
import hashUtils from '../utils/hash.utils.js'
import tokenUtils from '../utils/token.utils.js'
import dotenv from 'dotenv'
dotenv.config()

const register = async(user) => {
    try{
        const hashPassword = await hashUtils.hashPassword(user.password)
        const [findUser] = await database.pool.query(`SELECT * FROM users WHERE username = ?`, [user.username])
        if (findUser.length != 0)
            return false
        else{
            database.pool.query(`INSERT INTO users(email, username, password) VALUES (?, ?, ?)`, [user.email, user.username, hashPassword])
            console.log(user)
            return true
        }
    }
    catch(err) {
        console.log("Loi o service", err)
        return false
    }
}

const login = async(user) => {
    try{
        const [rows] = await database.pool.query(`SELECT password FROM users WHERE username = ?`, [user.username]);
        const password = rows[0]?.password
        if (password && await hashUtils.comparePassword(user.password, password)){
            console.log('Dang nhap thanh cong')
            console.log(user)
            const token = await tokenUtils.createToken(user)
            console.log(token)
            return token
        }
        else{
            console.log('Dang nhap that bai')
            return false
        }
    }
    catch(err) {
        console.log("Loi o service", err)
        return false
    }
}

const isThereExistedEmail = async(email) => {
    try{
        const [findUser] = await database.pool.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (findUser.length == 0)
            return false
        else{
            console.log('Email ton tai')
            return true
        }
    }
    catch(err) {
        console.log("Loi o service", err)
        return false
    }
}

export default {register, login, isThereExistedEmail}

