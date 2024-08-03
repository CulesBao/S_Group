const downloadFile = (req, res) => {
    let file = req.params.name;
    if (!file) {
        return res.status(400).send('Please provide a file name!');
    }
    res.status(200).json({ message: `Download file ${file} successfully!` });
}
const uploadSingle = async (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
};

const uploadMultiple = async (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
}

export default {downloadFile, uploadSingle, uploadMultiple};