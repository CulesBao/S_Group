const uploadSingle = async (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    next()
};

const uploadMultiple = async (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    next()
}

function authenToken(req, res, next){
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(' ')[1]
    if (!token)
        return res.status(401).send({
            message: 'No token provided'
        })
    next()
}

export default {uploadSingle, uploadMultiple, authenToken};