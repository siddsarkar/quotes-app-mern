const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Comment = require("../models/commentsModel");
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

router.get("/", (req, res) => {
  res.json({ message: "wlcome to comments" });
});

router.post("/add/:articleId", isAuthenticated, (req, res) => {
  const articleId = req.params.articleId;
  const comment = req.body.comment;
  const author = req.body.author;
  const authorId = req.authorId;
  const commentBody = { articleId, comment, author, authorId };

  const newComment = new Comment({
    ...commentBody,
    articleId: new ObjectId(articleId),
  });

  newComment.save((err) => {
    if (err) return err;
    else {
      res.json({ message: "comment added" });
    }
  });
});

router.get("/get/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  Comment.find({ articleId }, (err, comments) => {
    if (err) throw err;
    else {
      res.json(comments);
    }
  });
});

router.delete("/delete/:commentId", isAuthenticated, (req, res) => {
  Comment.remove({ _id: req.params.commentId }, (err) => {
    res.json({ message: "comment deleted" });
  });
});

router.get("/mycomments", isAuthenticated, (req, res) => {
  const authorId = req.authorId;
  Comment.find({ authorId }, (err, mycomments) => {
    if (err) return err;
    res.json({ mycomments });
  });
});

module.exports = router;
