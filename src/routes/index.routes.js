import authApis from './apis/auth.routes.js';
import uploadsApis from './apis/uploads.routes.js';
import votesApis from './apis/votes.routes.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.use('/api/auth', authApis);
router.use('/api/', uploadsApis);
router.use('/api', votesApis);

export default router;

