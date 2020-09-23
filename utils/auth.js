const jwt = require("jsonwebtoken");
const config = require("../config");

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const authorizationToken = authorizationHeader.split(" ")[1];
  if (authorizationToken) {
    jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "unauthorized! Please login/signup" });
      } else {
        req.authorId = decoded.id;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = isAuthenticated;
