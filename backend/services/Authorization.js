const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

class Authorization {
  authorized(req, res, next) {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const token = headerToken.split("Bearer ")[1];

      const verified = jwt.verify(token, SECRET_KEY);

      verified
        ? next()
        : res.status(401).json({ errors: [{ msg: "UnAuthorized Token !" }] });
    } else {
      res.status(401).json({ errors: [{ msg: " Token missing !" }] });
    }
  }
}

module.exports = new Authorization();
