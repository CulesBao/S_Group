import authService from '../services/auth.service.js'

const register = async (req, res) => {
    try{
        const registerInfo = req.body
        const response = await authService.register(registerInfo)
        let {status, ...data} = response

        return res.status (status).json(data)
    }
    catch(err){
        console.log('Loi o controller', err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const login = async(req, res) => {
    try{
        const loginInfo = req.body
        const response = await authService.login(loginInfo)
        let {status, ...data} = response

        return res.status(status).json(data)
    }
    catch(err){
        console.log('Loi o controller', err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const sendOTP = async(req, res) => {
    try{
        let objInfo = req.body
        let response = await authService.sendOTP(objInfo)
        let {status, ...data} = response

        return res.status(status).json(data)
    }
    catch(err){
        console.log('Loi o controller', err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

const resetPassword = async(req, res) => {
    try{
        const objInfo = req.body
        const response = await authService.resetPassword(objInfo)
        let {status, ...message} = response

        return res.status(status).json(message)
    }
    catch(err){
        console.log('Loi o controller', err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    } 
}

export default {register, login, sendOTP, resetPassword}