http = require('http');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./auth');

const app = express();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes/routes.js');
//const adminroutes = require('./routes/admin.js');

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile']})
);


app.get('/google/callback',
    passport.authenticate('google', { successRedirect: '/protected', failureRedirect: '/auth/failure'})
);

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});  

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', routes);

const server = http.createServer(app);

server.listen(3000,'localhost');
