const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/usersModel");
const router = express.Router();

router.post("/signup", (req, res) => {
  const name = req.body.name || "";
  const username = req.body.username || "";
  const password = req.body.password || "";

  const reqBody = { name, username, password };
  const newUser = new User(reqBody);

  bcrypt.genSalt(10, async (err, salt) => {
    const hashedPass = await bcrypt.hash(newUser.password, salt);
    newUser.password = hashedPass;
    newUser.save((err) => {
      if (err) return err;
      res.json({ message: "user registered" });
    });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username || "";
  const password = req.body.password || "";
  User.findOne({ username }, (err, user) => {
    if (err) return err;
    if (user) {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return err;
        if (isMatch) {
          const token = jwt.sign(
            {
              id: user._id,
              username: user.username,
            },
            config.jwtSecret,
            {
              expiresIn: "1h",
            }
          );
          res.json({ token, message: "Successfully Logged in!" });
        } else {
          res.sendStatus(404);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
