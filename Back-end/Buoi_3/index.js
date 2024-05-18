import express from 'express'
import bodyParser from 'body-parser'
const app = express()
import userRoutes from './user.js';
const PORT = 3000

app.use(express.json())
app.use('/users', userRoutes)

app.get('/', (req, res) =>{
    res.send("CC");
})

app.listen(PORT, () =>{
    console.log("Hello world")
})