const express = require("express");
const redis = require('redis');

const app = express();

const client = redis.createClient({
    host: 'redis-server',
    port: 6379  /*default port */
});
client.set('visits', 0);
client.on('error', (err) => console.log('Redis Client Error', err));

app.get('/', (req, res)=>{
client.get('visits',(err, visits)=>{
    if(!err){
        res.send("Number of visits:" + visits);
        client.set('visits', parseInt(visits) + 1);
    }
    else{
        res.send('Redis Client Error', err);
    }
})
})


app.listen(8080,()=>{
    console.log("listining on 8080")
})