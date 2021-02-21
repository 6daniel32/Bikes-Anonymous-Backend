import express = require('express');
import cors = require('cors');
import mongoose = require('mongoose');
import redis = require('redis');
import bodyParser = require('body-parser')

require('dotenv').config();
const router = require('./api/routes');

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', router);

const atlas_uri: string = process.env.ATLAS_URI;
mongoose.connect(atlas_uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const redisClient = redis.createClient({
    port: Number(process.env.REDIS_PORT)
});
redisClient.on("error", (err) => console.log(err));
redisClient.on("connect", () => console.log('redis connected'));

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});