const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");

const mongoose = require("mongoose");
const Like = require("../models/likesModel");
const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();

//middleware
const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const authorizationToken = authorizationHeader.split(" ")[1];
  if (authorizationToken) {
    jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else {
        req.authorId = decoded.id;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

router.post("/like/:articleId", isAuthenticated, (req, res) => {
  const articleId = req.params.articleId;
  const authorId = req.authorId;

  const doStuff = (item) => {
    if (item === null) {
      const newLike = new Like({
        authorId: new Object(authorId),
        articleId: new Object(articleId),
      });

      newLike.save((err) => {
        if (err) return err;
        else {
          res.json({ message: "liked" });
        }
      });
    } else {
      Like.findByIdAndDelete(item._id, (err) => {
        if (err) return err;
        res.json({ message: "unliked" });
      });
    }
  };

  Like.findOne({ authorId, articleId }, (err, item) => {
    if (err) return err;
    doStuff(item);
  });
});

router.get("/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  Like.find({ articleId }, (err, item) => {
    if (err) throw err;
    else {
      res.json(item.length);
    }
  });
});

module.exports = router;
