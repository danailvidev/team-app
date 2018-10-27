var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy
var User = require('../user/userModel')

passport.use(new FacebookStrategy({
    clientID: '223564278507188',
    clientSecret: 'e5ed201b88781290a19307e9605919fd',
    callbackURL: 'http://localhost:3000/api/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;