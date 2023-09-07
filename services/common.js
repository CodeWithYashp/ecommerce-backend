const passport = require("passport");
const nodemailer = require("nodemailer");

// Emails
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ypandey.5602@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjdjN2RhMWRlZmQzZTcyY2NmMWU5YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDAwOTMyNX0.Vq9qDR5n2makbMAhfFOS5YfCmoclvNiXv5fKruYEAhc";
  return token;
};

exports.sendMail = async function ({ to, subject, text, html }) {
  let info = await transporter.sendMail({
    from: '"Shopnest" <shopnest@ecommerce.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  return info;
};
