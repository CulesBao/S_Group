import database from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt, {genSalt} from 'bcrypt'

const register = async(user) => {
    try{
        const saltRound = 10
        const hashPassword = await bcrypt.hash(user.password, saltRound)
        const [findUser] = await database.query(`SELECT * FROM users WHERE username = ?`, [user.username])
        // console.log(findUser[0])
        if (findUser.length != 0)
            return false
        else{
            database.query(`INSERT INTO users(email, username, password) VALUES (?, ?, ?)`, [user.email, user.username, hashPassword])
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
        const [rows] = await database.query(`SELECT password FROM users WHERE username = ?`, [user.username]);
        const password = rows[0]?.password;
        if (password && await bcrypt.compare(user.password, password)){
            console.log('Dang nhap thanh cong')
            console.log(user)
            const token = await createToken(user)
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

function createToken(user) {
    return jwt.sign({
        username: user.username,
        email: user.email,
        password: user.password
    }, 'secret', {expiresIn: '1h'})
}

export default {register, login}

