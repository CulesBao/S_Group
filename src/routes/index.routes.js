import userRouter from './apis/auth.routes.js';
import uploadRouter from './apis/uploads.routes.js';
import votesRouter from './votes.routes.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.use('/api/auth', userRouter);
router.use('/api/', uploadRouter);
router.use('/api', votesRouter);

export default router;

