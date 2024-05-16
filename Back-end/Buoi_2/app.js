var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(res, req){
  req.send("Hello World");
})
app.listen(port, function(){
  console.log("http://localhost:`${port}`");
})