import authService from './../services/auth.service.js'

const register = async (req, res) => {
    try{
        let user = req.body
        let register = await authService.register(user)
        if (register == true)
            res.status(201).json(register)
        else
            res.status(400).json("Tai khoan da ton tai")
    }
    catch(err){
        res.json("Loi")
    }
}

const login = async(req, res) => {
    try{
        let user = req.body
        let login = await authService.login(user)
        if (login)
            res.status(200).json('Dang nhap thanh cong')
        else
            res.status(400).json("Sai tk hoac mk")
    }
    catch(err){
        res.status(400).json('err ', err)
    }
}

export default {register, login}