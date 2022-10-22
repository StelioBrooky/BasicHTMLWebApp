// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

http = require('http');
const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
const app = express();
// const bcrypt = require('bcryptjs')
// const flash = require('express-flash')
// const methodOverride = require('method-override')

const port = process.env.PORT || 3000;

// require('./auth');

// const initializePassport = require('./passport-config')
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )

// const users = []

// function isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401);
// }

// app.use(session({ secret: 'process.env.SESSION_SECRET', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');

//app.use(flash())

//app.use(methodOverride('_method'))

const routes = require('./routes/routes.js');
//const adminroutes = require('./routes/admin.js');
app.use('/', routes);

// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['email', 'profile']})
//   );

// app.get('/google/callback',
//     passport.authenticate('google', { successRedirect: '/protected', failureRedirect: '/auth/failure'})
//   );

// app.get('/auth/google/failure', (req, res) => {
//     res.send('Failed to authenticate..');
//   });

// app.get('/protected', isLoggedIn, (req, res) => {
//     console.log("index log: "+isLoggedIn);
//     res.send(`Hello ${req.user.displayName}`);
//    });  

// app.get('/logout', (req, res, next) => {
//       req.logout(function (err) {
//         if (err) {
//           return next(err);
//         }
//         res.redirect('/');
//       });
// })

// app.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.ejs', { name: req.user.name })
//   })

// app.get('/login', checkNotAuthenticated, (req, res) => {
//       res.render('login.ejs')
//     })
    
// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
// })

// app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     users.push({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     })
//     res.redirect('/login')
//     } catch {
//     res.redirect('/register')
//     }
// })

// app.delete('/logout', (req, res, next) => {
//     req.logOut((err) => {
//     if (err) {
//         return next(err);
//     }
//     res.redirect('/');
//     });
// })

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//     return next()
//     }

//     res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//     return res.redirect('/')
//     }
//     next()
// }

//const server = http.createServer(app);

module.export =  port;

module.exports = app;

//server.listen(port,'localhost');
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
