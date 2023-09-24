const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts)

});

const handleEvent = (type,data)=>{
    switch (type) {
        case 'PostCreated': {
            const {id, title} =data
            posts[id] = { ...data, comments: [] }
            break;
        }
        case 'CommentCreated': {
            const { id, content, postId,status } = data;
            const post = posts[postId];
            post['comments'].push({ id, content,status })
            break;
        }
        case 'CommentUpdated':{
            const { id, content, postId,status } = data;
            const post = posts[postId];
            const comment = post.comments.find(comment=>comment.id===id);
            comment.status =status;
            comment.content = content;
            break;
        }
    }
}

app.post('/events',(req,res)=>{
    const { type, data } = req.body;
    handleEvent(type,data);
    console.log(posts)
    res.send({})
})


app.listen(4002, async() => {
    console.log("Listerning on 4002");
    try {
        const res = await axios.get("http://event-bus-srv:4005/events").catch(error=>console.log("Error: ", error.message));
        for(let event of res.data){
            handleEvent(event.type,event.data);
        }   
    } catch (error) {
        console.log("Process Event Error: ", error.message);
    }
})

