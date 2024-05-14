import { v4 as uuidv4 } from 'uuid';
import express from 'express';

const router = express.Router();

const users = [
];

router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
}) 

// router.get('/', (req, res) => {
//     res.send(users);
// })

 export default router