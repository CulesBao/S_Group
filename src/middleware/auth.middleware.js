import db from '../config/db.js';
import regexUtils from '../utils/regex.utils.js';

function validation(req, res, next) {
    const user = req.body;

    if (regexUtils.validateName(user.username) && regexUtils.validatePassword(user.password)) {
        next();
    } else {
        res.status(400).send({
            message: 'Invalid name or password'
        });
    }
}

const checkOTP = async (req, res, next) => {
    try{
        const {email, otp} = req.body
        const [findOne] = await db.pool.query(`SELECT * FROM otp WHERE email = ?`, [email])
        if (findOne.length === 0)
            return res.status(400).json({
                message: 'Can not found email'
            })
        else{
            const timeNow = Date.now() 
            const expTime = new Date(findOne[0].EXP).getTime()
            if (findOne[0].otp == otp && expTime > timeNow){
                next()
            }
            else
                return res.status(400).json({
                    message: 'Invalid OTP'
                })
        }
    }
    catch (err) {
        console.log("Loi o middleware ", err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const isThereExistedEmail = async(req, res, next) => {
    try{
        const email = req.body.email
        const [findUser] = await db.pool.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (findUser.length == 0)
            return res.status(400).json({
                message: 'Can not found email'
            })
        else{
            console.log('Email ton tai')
            next()
        }
    }
    catch(err) {
        console.log("Loi o service", err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export default {validation, checkOTP, isThereExistedEmail};
