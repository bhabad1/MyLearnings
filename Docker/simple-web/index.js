var express = require('express')
var app = express();

app.use('/',(req,res)=>{
res.send("Hello from web server")
});

app.listen(8000,()=>{
    console.log("Server listening on port 8080")
})