import express from 'express';
import bodyParser from 'body-parser'
const app = express();
import usersRoutes from './getUser.js';

const PORT = 5000;

app.use(bodyParser.json());
app.use('/getUsers', usersRoutes);

app.get('/', (req, res) => res.send('HELLO  HOMEPAGE'))

// app.get('/', (req, res));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));