// var passport = require('passport')
// var GitHubStrategy = require('passport-github').Strategy
// var User = require('../user/userModel')

// passport.use(new GitHubStrategy({
//     clientID: "e7b10decd2ed4ef13816",
//     clientSecret: "bb073a53914d014f328de98ad9fe5a3cff366912",
//     callbackURL: "http://localhost:3000/api/auth/github/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ userid: profile.id }, { name: profile.displayName, userid: profile.id }, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));

// module.exports = passport;