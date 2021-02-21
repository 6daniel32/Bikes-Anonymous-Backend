"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const redis = require("redis");
const bodyParser = require("body-parser");
require('dotenv').config();
const router = require('./api/routes');
const app = express();
const port = Number(process.env.PORT) || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
const atlas_uri = process.env.ATLAS_URI;
mongoose.connect(atlas_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
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
//# sourceMappingURL=server.js.map