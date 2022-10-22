const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '999236982179-rvfglcmbhdtlpbsv4bk6rc7gu789hvlh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

CB1 = "http://localhost:3000/google/callback";
CB2 = 'https://reptile-resource.herokuapp.com/google/callback';

const port = require('./index.js')

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: (port == 3000) ? CB1 : CB2,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});