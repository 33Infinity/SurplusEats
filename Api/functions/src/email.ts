const email_functions = require("firebase-functions");
const email_admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const email_cors = require("cors")({ origin: true });
email_admin.initializeApp();

const fromEmail = "surpluseats@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: fromEmail,
    pass: "SurplusEats2020",
  },
});

exports.sendMail = email_functions.https.onRequest((req, res) => {
  email_cors(req, res, () => {
    const dest = req.query.destination;
    const subject = req.query.subject;
    const body = req.query.body;
    const mailOptions = {
      from: "Surplus Eats <" + fromEmail + ">",
      to: dest,
      subject: subject, // email subject
      html: body,
    };
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.send(error.toString());
      }
      return res.send("Sent");
    });
  });
});
