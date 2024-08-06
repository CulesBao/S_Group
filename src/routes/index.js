import userRouter from './auth.routes.js';
import uploadRouter from './uploads.routes.js';
import votesRouter from './votes.routes.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello")
});
router.use('/auth', userRouter);
router.use('/api', uploadRouter);
router.use('/api', votesRouter);

export default router;

