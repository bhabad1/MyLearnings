const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
const events = [];

app.post('/events',(req,res)=>{
    const event = req.body;
    events.push(event);
    axios.post("http://posts-cip-srv:4000/events",event).catch(error=>{console.log("Error Posts: ",error.message)});
    axios.post("http://comments-srv:4001/events",event).catch(error=>{console.log("Error Comments: ",error.message)});
    axios.post("http://query-srv:4002/events",event).catch(error=>{console.log("Error Query: ",error.message)});
    axios.post("http://moderation-srv:4003/events",event).catch(error=>{console.log("Error Moderation: ",error.message)});

    res.send({status:'OK'});

});

app.get('/events', (req,res)=>{
    res.send(events);
})


app.listen(4005,()=>{
    console.log("Listening on 4005")
})
