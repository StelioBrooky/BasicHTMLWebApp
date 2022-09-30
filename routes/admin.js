const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    //res.send('<h1>Hello There</h1>');

    //res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    // instead of res.send, we can use res.sendFile to send a file

    res.render('index', {'pageTitle': 'This is the Admin Page'});
});

module.exports = router;