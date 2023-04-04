var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
require('dotenv').config({silient: true})


var strategy = new Auth0Strategy({
    domain:       process.env.DOMAIN,
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:  process.env.CALLBACK_URL,
    baseURL: 'https://loteriamujeres.herokuapp.com',
    issuerBaseURL: 'https://dev-qauothmtu2dhfuyy.us.auth0.com'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy;
