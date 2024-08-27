import uploadsService from '../services/uploads.service.js'

const decodeToken = async(req, res) => {
    try{
        const authorizationHeader = req.headers['authorization']
        const token = authorizationHeader && authorizationHeader.split(' ')[1]
        let response = await uploadsService.decodeToken(token)
        let {status, ...data} = response
        
        return res.status(status).json(data)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export default {decodeToken}
