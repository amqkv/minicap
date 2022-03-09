const nodemailer = require("nodemailer");
const constants = require("./constants");

const emailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: "SSLv3",
    },
    auth: {
        user: constants.ADMIN_EMAIL_ACCOUNT,
        pass: process.env.ADMIN_EMAIL_SENDER_PASSWORD,
    },
});

module.exports = {
    emailTransporter,
};
