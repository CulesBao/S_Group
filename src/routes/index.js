import express from 'express';
import userRouter from './auth.routes.js';

const router = express.Router();

router.use('/auth', userRouter);

export default router;
