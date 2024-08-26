import authService from '../services/auth.service.js'

const register = async (req, res) => {
    try{
        let user = req.body
        let response = await authService.register(user)
        let {status, ...message} = response
        return res.status (status).json(message)
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
        let user = req.body
        let response = await authService.login(user)
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

const forgotPassword = async(req, res) => {
    try{
        let email = req.body.email
        let response = await authService.forgotPassword(email)
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

const resetPassword = async(req, res) => {
    try{
        let email = req.body.email
        let password = req.body.password
        let response = await authService.resetPassword(email, password)
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

export default {register, login, forgotPassword, resetPassword}