// var passport = require('passport')
// var TwitterStrategy = require('passport-twitter').Strategy
// var User = require('../user/userModel')

// passport.serializeUser(function (user, fn) {
//     fn(null, user);
// });

// passport.deserializeUser(function (id, fn) {
//     User.findOne({ _id: id.doc._id }, function (err, user) {
//         fn(err, user);
//     });
// });

// passport.use(new TwitterStrategy({
//     consumerKey: "nmbk1uqKB0rbWjBxrPv9iksEf",
//     consumerSecret: "QeBlJHanPy232ZbOhyPisfI8hLLUVMujXjuI7Sz0Ym4o6m7eGF",
//     callbackURL: "http://localhost:3000/api/auth/twitter/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ name: profile.displayName }, { name: profile.displayName, userid: profile.id }, function (err, user) {
//             if (err) {
//                 console.log(err);
//                 return done(err);
//             }
//             done(null, user);
//         });
//     }
// ));

// module.exports = passport;