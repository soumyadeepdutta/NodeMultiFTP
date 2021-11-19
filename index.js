const express = require("express");
const fileUpload = require('express-fileupload');
const { upload, download } = require("./helper");
const app = express();

app.use(fileUpload())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    return res.render('index.html')
})

app.get('/file', async (req, res) => {
    if (req.query.filename) {
        const file = await download(req.query.filename);
        if (!file) return res.send('no file found with ' + req.query.filename)
        return res.sendFile(file);
    }
    return res.send('need a filename in param')
})

app.post('/', async (req, res) => {
    file = req.files.filename;

    if (upload(file)) return res.send('saved')
    return res.status(400).status('not saved')
})

app.listen(3000, () => {
    console.log('app started on port 3000');
})
