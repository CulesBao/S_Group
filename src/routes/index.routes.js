import userRouter from './apis/auth.routes.js';
import uploadRouter from './uploads.routes.js';
import votesRouter from './votes.routes.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.use('/auth', userRouter);
router.use('/', uploadRouter);
router.use('/', votesRouter);

export default router;

