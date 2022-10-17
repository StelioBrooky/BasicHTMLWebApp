const reptile = require('../model/model');

exports.getIndex = (req, res) => {
    res.render('index', {pageTitle: 'Home Page', name:'', reptiles: reptile.fetchAll()});
}

exports.getAddPage = (req, res) => {
    res.render('addPage', {pageTitle: 'Admin Page', name:'Admin'});
};

exports.postAddPage = (req, res) => {
    console.log(req.body.name);
    p = new reptile(req.body.id, req.body.name);
    p.save();
    console.log(reptile.fetchAll());
    res.render('index', {pageTitle: 'Home Page', name:'', reptiles: reptile.fetchAll()});
}