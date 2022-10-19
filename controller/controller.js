//import StartFirebase from '../data/config';

const StartFirebase = require('../data/config');
const reptile = require('../model/model');
const db = StartFirebase();

const {set, ref} = require("firebase/database");

exports.getIndex = (req, res) => {
    var rootRef = ref(db, 'reptiles/1');
    console.log(rootRef);

    res.render('index', {pageTitle: 'Home Page', name:'', reptiles: reptile.fetchAll()});
}

exports.getAddPage = (req, res) => {
    res.render('addPage', {pageTitle: 'Admin Page', name:'Admin'});
};

exports.postAddPage = (req, res) => {
    var reptileName = req.body.name;
    var reptileId = req.body.id;

    if(req.body.action == 'add'){

        set(ref(db, 'reptiles/' + reptileId), {
            name: reptileName
        })
        .then(() => {
            console.log('Data saved!');
        })
        .catch((error) => {
            console.log('Data not saved: ' + error);
        });
        
        console.log(req.body.name);
        p = new reptile(req.body.id, req.body.name);
        p.save();
        console.log(reptile.fetchAll());
        res.render('index', {pageTitle: 'Home Page', name:'', reptiles: reptile.fetchAll()});
    }
    else if(req.body.action == 'delete'){
        console.log('delete');
    }
}