import express from 'express'
import bodyParser from 'body-parser'
import validation from './validationMiddleware.js'

const port = 3000
let app = express()
app.use(bodyParser.json())

app.post('/signup', validation, (req, res) => {
    res.send("Signup successful!")
})

app.listen(port, () =>{
    console.log("Hihihiihihihihihi")
})