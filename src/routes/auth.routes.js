import express from 'express';
import userController from '../controller/auth.controller.js';
import middlewareAuth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', middlewareAuth.validation, userController.register);
router.post('/login', middlewareAuth.validation, userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.resetPassword);

export default router;
