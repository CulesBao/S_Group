import express from 'express';
import authController from '../../controller/auth.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', authMiddleware.validation, authController.register);
router.post('/login', authMiddleware.validation, authController.login);
router.post('/forgot-password', authMiddleware.isThereExistedEmail, authController.sendOTP);
router.put('/reset-password', authMiddleware.checkOTP, authController.resetPassword);

export default router;
