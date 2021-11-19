const express = require("express");
const fileUpload = require('express-fileupload');
const upload = require("./helper");
const app = express();

app.use(fileUpload())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    return res.render('index.html')
})

app.post('/', async (req, res) => {
    file = req.files.filename;

    if (upload(file)) return res.send('saved')
    return res.status(400).status('not saved')
})

app.listen(3000, () => {
    console.log('app started on port 3000');
})
