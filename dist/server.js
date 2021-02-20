"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = Number(process.env.PORT) || 5000;
app.use(cors());
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
//# sourceMappingURL=server.js.map