const express = require('express');
const path = require('path');
require("dotenv").config();

const PORT = process.env.REACT_APP_PORT || 8080;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(PORT, () => {console.log("Server started on PORT = ", PORT)});


