//import StartFirebase from '../data/config';

const StartFirebase = require('../data/config');
const reptile = require('../model/model');
const db = StartFirebase();

const {set, ref, get, child, remove} = require("firebase/database");

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
    var reptileDiet = req.body.diet;
    var reptileLocation = req.body.location;
    var reptileLifeExpectancy = req.body.lifeExpectancy;
    var reptileScientificName = req.body.scientificName;
    var reptileEnclousure = req.body.enclosure;
    var reptileDescription = req.body.description;

    if(req.body.action == 'add'){

        set(ref(db, 'reptiles/' + reptileId), {
            name: reptileName,
            diet: reptileDiet,
            location: reptileLocation,
            lifeExpectancy: reptileLifeExpectancy,
            scientificName: reptileScientificName,
            enclosure: reptileEnclousure,
            description: reptileDescription
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
        remove(child(ref(db), 'reptiles/' + reptileId))
        .then(() => {
            console.log('Data removed!');
            res.render('index', {pageTitle: 'Home Page', name:'', reptiles: reptile.fetchAll()});
        })
        .catch((error) => {
            console.log('Data not removed: ' + error);
        });
        console.log('delete');
    }

    else if(req.body.action == 'update'){
        console.log('update');
    }
    else if(req.body.action == 'select'){
        const dbref = ref(db);
        get(child(dbref, 'reptiles/' + reptileId)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                req.body.name = snapshot.val().name;
                req.body.diet = snapshot.val().diet;
                req.body.location = snapshot.val().location;
                req.body.lifeExpectancy = snapshot.val().lifeExpectancy;
                req.body.scientificName = snapshot.val().scientificName;
                req.body.enclosure = snapshot.val().enclosure;
                req.body.description = snapshot.val().description;

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        console.log('select');
    }
}