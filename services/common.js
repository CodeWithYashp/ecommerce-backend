const passport = require("passport");

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
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjdjN2RhMWRlZmQzZTcyY2NmMWU5YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDAwOTMyNX0.Vq9qDR5n2makbMAhfFOS5YfCmoclvNiXv5fKruYEAhc";
  return token;
};
