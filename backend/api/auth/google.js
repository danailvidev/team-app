var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var User = require('../user/userModel')
var jwt = require('jwt-simple')
const config = require('../../config/config')

passport.use(new GoogleStrategy({
    clientID: "1070744256370-7kjmcs129d2kcbk5bctt76na37le9ulh.apps.googleusercontent.com",
    clientSecret: "9opi0XaQp3JihOvfo3Fj3QLI",
    callbackURL: "http://localhost:3000/api/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        // check for existing email
        var user = await User.findOne({
            email: profile.emails[0].value
        })

        if (user) {
            return done('Email Already Exist')
        } else {
            user = new User({ email: profile.emails[0].value })
        }

        user.save((err, newUser) => {
            var payload = {
                sub: newUser._id
            }
        
            newUser.token = jwt.encode(payload, config.bcryptSecret)
            done(err, newUser)
        })
    }
));

module.exports = passport;