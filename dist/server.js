"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const redis = require("redis");
require('dotenv').config();
const app = express();
const port = Number(process.env.PORT) || 5000;
const router = require('./api/routes');
app.use(cors());
app.use(express.json());
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
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
//# sourceMappingURL=server.js.map