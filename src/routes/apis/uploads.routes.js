import express from 'express';
import multer from 'multer';
import uploadsMiddleware from '../../middleware/uploads.middleware.js';
import uploadsController from '../../controller/uploads.controller.js';

const router = express.Router();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
   
let upload = multer({ storage: storage })

router.post('/upload-single-file', uploadsMiddleware.authenToken, upload.single('file'), uploadsMiddleware.uploadSingle, uploadsController.decodeToken);
router.post('/upload-multiple-files', uploadsMiddleware.authenToken, upload.array('files', 10), uploadsMiddleware.uploadMultiple, uploadsController.decodeToken); 

export default router;