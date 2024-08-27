import regexUtils from '../utils/regex.utils.js'

const validation = (req, res, next) => {
    const form = req.body

    if (regexUtils.validateName(form.username) && regexUtils.validatePassword(form.password)) 
        next()
    else {
        res.status(400).send({
            message: 'Invalid name or password'
        })
    }
}

const checkOTP = async (req, res, next) => {
    try{
        next()
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
        // regex email
        next()
    }
    catch(err) {
        console.log("Loi o service", err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export default {validation, checkOTP, isThereExistedEmail}
