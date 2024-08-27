import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import database from '../config/db.js'
dotenv.config()

const decodeToken = async (token) => {
    try{
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return reject({
                        status: 401,
                        message: 'Token is invalid'
                    });
                }
                resolve(decoded);
            });
        });
        const [findOne] = await database.pool.query(`SELECT * FROM users WHERE id = ?`, [decoded.id]);
        if (findOne.length == 0)
            return {
                status: 404,
                message: 'User not found'
            }
        return {
            status: 200,
            message: 'Token is valid',
            username: findOne[0].username
        }
    }
    catch(err){
        console.log("Loi o service", err)
        return {
            status: err.status || 500,
            message: err.message || 'Internal server error'
        }
    }
}

export default {decodeToken}