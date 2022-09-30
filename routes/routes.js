const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //res.send('<h1>Hello World!!!</h1>');
    res.render('index', {pageTitle: 'Home Page', name:''});
});

router.get('/admin', (req, res) => {
    res.render('index', {pageTitle: 'Admin Page', name:'Admin'});
});

module.exports = router;