import express from 'express';
import multer from 'multer';
import uploadsMiddleware from '../middleware/uploads.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
   
var upload = multer({ storage: storage })

router.post('/upload-single-file', authMiddleware.authenToken, upload.single('file'), uploadsMiddleware.uploadSingle);
router.post('/upload-multiple-files', authMiddleware.authenToken, upload.array('files', 10), uploadsMiddleware.uploadMultiple);
router.get('/download-file/:name', uploadsMiddleware.downloadFile);

export default router;