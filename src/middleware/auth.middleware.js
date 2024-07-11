import jwt from 'jsonwebtoken';
import db from '../config/db.js';
var nameRegex = /^[a-zA-Z0-9\-]+$/;
var passwordRegex = /^[a-zA-Z0-9\-\_]+$/;

function validateName(name) {
    return nameRegex.test(name);
}

function validatePassword(password) {    
    return passwordRegex.test(password);
}

function validation(req, res, next) {
    const user = req.body;
    console.log(user.username, user.password);

    if (validateName(user.username) && validatePassword(user.password)) {
        next();
    } else {
        res.status(400).send('Invalid name or password');
    }
}

function randomNum(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const checkOTP = async (email, otp) => {
    try{
        const [findOne] = await db.pool.query(`SELECT * FROM otp WHERE email = ?`, [email])
        if (findOne[0].length == 0)
            return false;
        else{
            const Timenow = Date.now() 
            const  exptime = new Date(findOne[0].EXP).getTime()
            console.log(Timenow, exptime)
            if (findOne[0].otp == otp && exptime> Timenow){
                return true
            }
            else
                return false
        }
    }
    catch (err) {
        console.log("Loi o middleware ", err)
        return false
    }
}

function authenToken(req, res, next){
    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        })
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(' ')[1]
    console.log('Token:', token)
    if (!token)
        return res.status(401).send('Access denied, there is no token')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send('Invalid token. Invalid user')
        req.user = user
        next()
    })
}

export default {validation, randomNum, checkOTP, authenToken};
