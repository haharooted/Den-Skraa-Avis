const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("server lytter på port 3000")
});

app.get('/', (req, res) => {
    res.json("startside")
});