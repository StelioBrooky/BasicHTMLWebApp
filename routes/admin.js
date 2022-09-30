const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    //res.send('<h1>Hello There</h1>');

    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    // instead of res.send, we can use res.sendFile to send a file

    // res.render('index'); - for ejs
});

module.exports = router;