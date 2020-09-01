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
  like: {
    type: Boolean,
    required: true,
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
  console.log(req.authorId);
  // const articleId = req.params.articleId;
  // const authorId = req.authorId;
  // const isLiked = req.body.isLiked;

  // const likeBody = { articleId: articleId, like: like };

  // const newLike = new Like({
  //   authorId: new Object(authorId),
  //   articleId: new Object(articleId),
  //   like: isLiked,
  // });

  // newLike.save((err) => {
  //   if (err) return err;
  //   else {
  //     res.json({ message: "liked post" });
  //   }
  // });
  res.json({ message: "ji" });
});

module.exports = router;
