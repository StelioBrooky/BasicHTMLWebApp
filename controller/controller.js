const StartFirebase = require('../data/config');
const passport = require('passport');
const express = require('express');
const reptile = require('../model/model');
const db = StartFirebase();
const {set, ref, get, child, remove, update, onValue} = require("firebase/database");

exports.getIndex = (req, res) => {
    reptile.clear();

    //Getting the information from the database
    var dbref = ref(db, 'reptiles');

    onValue(dbref, (snapshot) => {
            
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                var item = new reptile(keyName, data.name, data.diet, data.location, data.lifeExpectancy, data.scientificName, data.enclosure, data.description);
                item.save();
            });
        });


    res.render('index', {pageTitle: 'Home Page', name:'', isLoggedIn: req.user, reptiles: reptile.fetchAll()});
}

exports.getAddPage = (req, res) => {
    res.render('addPage', {idInput: req.body.id, nameInput: '', dietInput: '', locationInput: '', lifeExpectancyInput: '', scientificNameInput: '', enclosureInput: '', descriptionInput: ''});
};

exports.getLogin = (req, res) => {
    res.render('login', {title: 'Login'});
}

exports.postAddPage = (req, res) => {
    var reptileName = req.body.name;
    var reptileId = req.body.id;
    var reptileDiet = req.body.diet;
    var reptileLocation = req.body.location;
    var reptileLifeExpectancy = req.body.lifeExpectancy;
    var reptileScientificName = req.body.scientificName;
    var reptileEnclousure = req.body.enclosure;
    var reptileDescription = req.body.description;
    console.log(reptileDescription);

    if(req.body.action == 'add'){
        reptile.clear();
        //if the id already exists in the database, then don't add it
        const dbref = ref(db);
        get(child(dbref, 'reptiles/' + reptileId)).then((snapshot) => {
            if (snapshot.exists()) {
                //alert the user that the reptile exists in the database already
                console.log('reptile already exists');
                console.log(snapshot.val());
                res.status(409).send("Reptile Already Exists");
            } else {
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
            res.status(500).send("Data Not Saved");
        });
    
        res.redirect('/');
    }
});
    }
    

    else if(req.body.action == 'delete'){
        reptile.clear();
        remove(child(ref(db), 'reptiles/' + reptileId))
        .then(() => {
            console.log('Data removed!');
            res.redirect('/');
        })
        .catch((error) => {
            console.log('Data not removed: ' + error);
            res.status(400).send("Invalid reptile ID");
        });
        console.log('delete');
    }

    else if(req.body.action == 'update'){
        reptile.clear();
        update(ref(db, 'reptiles/' + reptileId), {
            name: reptileName,
            diet: reptileDiet,
            location: reptileLocation,
            lifeExpectancy: reptileLifeExpectancy,
            scientificName: reptileScientificName,
            enclosure: reptileEnclousure,
            description: reptileDescription
        })
        .then(() => {
            console.log('Data updated!');
            res.redirect('/');
        })
        .catch((error) => {
            console.log('Data not updated: ' + error);
            res.status(500).send("Data Not Updated");
        });

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

                res.render('addPage', {idInput: req.body.id, nameInput: snapshot.val().name, dietInput: snapshot.val().diet, locationInput: snapshot.val().location, lifeExpectancyInput: snapshot.val().lifeExpectancy, scientificNameInput: snapshot.val().scientificName, enclosureInput: snapshot.val().enclosure, descriptionInput: snapshot.val().description});

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
            res.status(400).send("Invalid reptile ID");
        });
        console.log('select');
    }
}


exports.getAuthGoogleFailure = (req, res) => {
    res.send('Failed to authenticate');
}

exports.getProtected = (req, res) => {
    res.render('protected', {name: req.user.displayName});
}

exports.getLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect('/');
    });
}

//--------------------Web Service--------------------

exports.getReptiles = (req, res) => {

    var url =req.params.repid;

    const dbref = ref(db);
        get(child(dbref, 'reptiles/' + url)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                res.json(snapshot.val());
            } else {
                res.status(400).send("Invalid reptile ID");
            }
        }).catch((error) => {
            console.error(error);
        });
}

exports.getDeleteReptiles = (req, res) => {

    var url =req.params.repid;

    const dbref = ref(db);
        remove(child(dbref, 'reptiles/' + url)).then(() => {
            res.status(200).send("Data removed");
        }).catch((error) => {
            console.error(error);
            res.status(400).send("Invalid reptile ID");
        });
}
