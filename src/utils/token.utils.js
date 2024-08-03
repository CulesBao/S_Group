import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function createToken(user) {
    return jwt.sign({
        username: user.username,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3m'})
}

export default {createToken}