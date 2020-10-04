/**
 * ?MIDDLEWARE - UTILITY
 * *Definition: CHECKS IF A USER IS VALID
 */

//token generator, config for env Variables
const jwt = require("jsonwebtoken");
const config = require("../config");

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const authorizationToken = authorizationHeader.split(" ")[1];
  if (authorizationToken) {
    // get current token if exist and verify
    jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        //verification unsuccesfull - UNAUTHORIZED
        res.sendStatus(401);
      } else {
        //verification succesfull gives id of the user and proceed
        req.authorId = decoded.id;
        next();
      }
    });
  } else {
    // token donot exist - FORBIDDEN
    res.sendStatus(403);
  }
};

module.exports = isAuthenticated;
