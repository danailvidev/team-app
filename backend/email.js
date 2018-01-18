const nodemailer = require('nodemailer')
var config = require('./config')

var transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
        user: config.smtp.user, 
        pass: config.smtp.pass
    } 
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Web Adventure" <hi@webadventure.org>', // sender address
    to: 'danailvidev@gmail.com', // list of receivers
    subject: 'default subject', // Subject line
    text: 'default text', // plaintext body
    html: '<b>default body</b>' // html body
};

var email = {
    sendEmail: (options) => {
        mailOptions.to = options.to
        mailOptions.subject = options.subject
        mailOptions.text = options.text
        mailOptions.html = options.html
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
}

module.exports = email