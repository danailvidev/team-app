var express = require('express')
var controller = require('./authController.js')
var authRouter = express.Router()
const {
    check
} = require('express-validator/check')
const {
    matchedData,
    sanitize
} = require('express-validator/filter')
// var passportFacebook = require('./facebook')
// var passportTwitter = require('./twitter')
// var passportGitHub = require('./github')
// var passportGoogle = require('./google')

/* FACEBOOK */
// authRouter.get('/facebook', passportFacebook.authenticate('facebook'))

// authRouter.get('/facebook/callback', (req, res, next) => {
//     console.log('entering here');
//     passportFacebook.authenticate('facebook', {
//         successRedirect: '/team-app',
//         failureRedirect: '/login'
//     }),
//         function (req, res) {
//             // Successful authentication, redirect home.
//             res.redirect('/');
//         }
// });

/* TWITTER */
// authRouter.get('/twitter',
//     passportTwitter.authenticate('twitter'));

// authRouter.get('/twitter/callback',
//     passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });

/* GOOGLE */
// authRouter.get('/google', passportGoogle.authenticate('google',{scope: 'https://www.googleapis.com/auth/plus.me https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'}));

// authRouter.get('/google/callback',
//     passportGoogle.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.cookie("token", req.user.token, { path: '/' });
//         res.redirect('http://localhost:4200/team-app');
//     });

/* GITHUB */
// authRouter.get('/github',
//     passportGitHub.authenticate('github', { scope: ['user:email'] }));

// authRouter.get('/github/callback',
//     passportGitHub.authenticate('github', { failureRedirect: '/login' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });

authRouter.route('/register')
    .post([
        // password
        check('password', 'passwords must be at least 5 chars long and contain one number')
            .isLength({
                min: 5
            })
            .matches(/\d/),

        // email
        check('email')
            .isEmail().withMessage('must be an email')
            .trim()
            .normalizeEmail()
    ], controller.register)

authRouter.route('/login')
    .post(controller.login)

module.exports = authRouter