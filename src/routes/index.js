import userRouter from './auth.routes.js';
import uploadRouter from './uploads.routes.js';
import express from 'express';

const router = express.Router();

router.use('/auth', userRouter);
router.use('/api', uploadRouter);

export default router;

