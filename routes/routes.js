if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const bcrypt = require('bcryptjs')
const flash = require('express-flash')
const methodOverride = require('method-override')

//const port = process.env.PORT || 3000;
require('../auth');

const router = express.Router();
const controller = require('../controller/controller.js');

const initializePassport = require('../passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
    console.log("index log: "+req.user);
}

router.use(session({ secret: 'process.env.SESSION_SECRET', resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.urlencoded({extended: false}));
// router.set('view engine', 'ejs');
// router.set('views', 'views');
router.use(flash())

router.use(methodOverride('_method'))


router.get('/', controller.getIndex);

router.get('/addPage', controller.getAddPage);

router.get('/login', checkNotAuthenticated, controller.getLogin);

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile']}));

router.get('/google/callback', passport.authenticate('google', { successRedirect: '/protected', failureRedirect: '/auth/failure'}));

router.get('/auth/google/failure', controller.getAuthGoogleFailure);

router.get('/protected', isLoggedIn, controller.getProtected); 

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const { password } = req.body
    if (password.length < 6) {
        return res.status(400).send('Password must be at least 6 characters')
    }
    if (password.length > 15) {
        return res.status(400).send('Password must be not be greater than 15 characters')
    }
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    res.redirect('/login')
    } catch {
    res.redirect('/register')
    }
})

router.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
    if (err) {
        return next(err);
    }
    res.redirect('/');
    });
})

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
    return res.redirect('/')
    }
    next()
}

router.post('/addPage', controller.postAddPage);

module.exports = router;