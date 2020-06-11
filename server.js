const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect DataBase
connectDB();

app.get('/', (req, res) => res.send("I am Server"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started at ${PORT}`));