const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({host:"redis-server"});
// client.connect();
client.on('error', err => console.log('Redis Client Error', err));

client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send("Number of visits : " + visits);
        client.set("visits", parseInt(visits) + 1)
    })
});


app.listen(4000, () => {
    console.log("server is listening on port 4000")
})