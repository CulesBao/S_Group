import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function createToken(user) {
    return jwt.sign({
        id: user.id
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3m'})
}

export default {createToken}