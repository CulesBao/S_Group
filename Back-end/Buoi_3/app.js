import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000;

app.use(bodyParser.json());

app.get('/', function(req, res){
    console.log('[GET ROUTE]');
    res.send('HEllo wordl');
})

app.listen(port, function(req, res){
    console.log(`http://localhost:${port}`)
})