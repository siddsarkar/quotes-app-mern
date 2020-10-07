/**
 * ?RULES:
 * *PROTECTED ROUTES REQUIRES USERS TO BE AUTHENTICATED
 */

//base
const express = require("express");
const router = express.Router();

//password hashing
const bcrypt = require("bcryptjs");

//token generator, config for env Variables
const jwt = require("jsonwebtoken");
const config = require("../config");

//models
const { User } = require("../models");

// sign up a user with name,username and password
router.post("/signup", (req, res) => {
  const name = req.body.name || "";
  const username = req.body.username || "";
  const password = req.body.password || "";
  const newUser = new User({ name, username, password });

  //encrypt the password
  bcrypt.genSalt(10, async (err, salt) => {
    const hashedPass = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPass;
    newUser.save((err) => {
      if (err) return err;
      res.json({ message: "user registered" });
    });
  });
});

//login a user
router.post("/login", (req, res) => {
  const username = req.body.username || "";
  const password = req.body.password || "";

  //find a user with given username
  User.findOne({ username }, (err, user) => {
    if (err) return err;
    if (user) {
      //if there is a user check if password matches
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return err;
        if (isMatch) {
          //if password matches generate token for the user
          const token = jwt.sign(
            {
              id: user._id,
              username: user.username,
            },
            config.jwtSecret,
            {
              expiresIn: "2h",
            }
          );
          res.json({ token, message: "Successfully Logged in!" });
        } else {
          //if password donot matche send error to user (401 - UNAUTHORIZED)
          res.sendStatus(401);
        }
      });
    } else {
      //if user is null then send error to user (404 - NOT FOUND)
      res.sendStatus(404);
    }
  });
});

module.exports = router;
