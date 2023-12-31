const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { error } = require('console');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentByPostId[req.params.id] || [])
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentByPostId[req.params.id] || [];


    comments.push({ id: commentId, status: 'pending', content });
    commentByPostId[req.params.id] = comments;
    await axios.post("http://event-bus-srv:4005/events", {
        type: 'CommentCreated',
        data: {
            id: commentId, content,
            postId: req.params.id,
            status: 'pending'
        }
    }).catch(error => {
        console.log("Error: ", error.message)
    })
    res.status(200).send(comments);
});
app.post('/events', async (req, res) => {
    console.log("Received Event: ", req.body.type);
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { id, postId, status, content } = data;
        let commnets = commentByPostId[postId];
        let comment = commnets.find(comment => comment.id == id);
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentUpdated",
            data: {
                id, postId, status, content
            }
        })

    }
    res.send({})
})

app.listen(4001, () => {
    console.log("Listening on 4001")
});

