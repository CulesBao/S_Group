const uploadSingle = async (req, res, next) => {
    const file = req.file
    if (!file) {
        return res.status(400).send({
            message: 'Please choose file'
        })
    }
    next()
};

const uploadMultiple = async (req, res, next) => {
    const files = req.files
    if (!files) {
        return res.status(400).send({
            message: 'Please choose file'
        })
    }
    next()
}

function authenToken(req, res, next){
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader)
        return res.status(401).send({
            message: 'No token provided'
        })
    next()
}

export default {uploadSingle, uploadMultiple, authenToken};