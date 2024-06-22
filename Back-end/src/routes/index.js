import express from 'express'
const router = express.Router();
import userRouter from './users.routes.js'



router.use("/user",userRouter );
export default router