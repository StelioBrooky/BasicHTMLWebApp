const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '999236982179-rvfglcmbhdtlpbsv4bk6rc7gu789hvlh.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback" || "https://reptile-resource.herokuapp.com/google/callback",
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