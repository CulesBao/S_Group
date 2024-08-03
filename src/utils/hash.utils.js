import bcrypt, {genSalt} from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const hashPassword = async(password) => {
    const saltRound = 10
    return await bcrypt.hash(password, saltRound)
}

const comparePassword = async(password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

export default {hashPassword, comparePassword}