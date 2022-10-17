const product = require('../model/model');

exports.getIndex = (req, res) => {
    res.render('index', {pageTitle: 'Home Page', name:''});
}

exports.getAddPage = (req, res) => {
    res.render('addPage', {pageTitle: 'Admin Page', name:'Admin'});
};

exports.postAddPage = (req, res) => {
    console.log(req.body.name);
    p = new product(req.body.id, req.body.name);
    p.save();
    console.log(p);
    res.render('index', {pageTitle: 'Home Page', name:''});
}