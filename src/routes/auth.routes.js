import express from 'express';
import userController from '../controller/auth.controller.js';
import middlewareAuth from '../middleware/middleware.auth.js';

const router = express.Router();

router.post('/register', middlewareAuth.validation, userController.register);
router.post('/login', middlewareAuth.validation, userController.login);

export default router;
