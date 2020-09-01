const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("../config");

const ObjectId = mongoose.Schema.Types.ObjectId;

const LikeSchema = mongoose.Schema({
  authorId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  articleId: {
    type: ObjectId,
    required: true,
    ref: "Article",
  },
  addedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Like = mongoose.model("Like", LikeSchema);
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

  const doStuff = (len) => {
    console.log(len);
  };

  Like.find({ articleId, authorId }, (err, item) => {
    if (err) return err;
    doStuff(item.length);
  });

  // if (condition === null) {
  //   const newLike = new Like({
  //     authorId: new Object(authorId),
  //     articleId: new Object(articleId),
  //   });

  //   newLike.save((err) => {
  //     if (err) return err;
  //     else {
  //       res.json({ message: "liked" });
  //     }
  //   });
  // } else {
  //   Like.find({ articleId, authorId }, (err, item) => {
  //     if (err) throw err;
  //     else {
  //       Like.findOneAndRemove({ _id: item._id }, (err) => {
  //         if (err) return err;
  //         res.json({ message: "unliked" });
  //       });
  //     }
  //   });
  // }
});

router.get("/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  Like.find({ articleId }, (err, item) => {
    if (err) throw err;
    else {
      res.json(item);
    }
  });
});

module.exports = router;
