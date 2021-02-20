import express = require('express');
import cors = require('cors');

require('dotenv').config();

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 5000;

app.use(cors());

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})