const express = require("express");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Comment = require("../models/commentsModel");
const { json } = require("body-parser");
const router = express.Router();

const isAuthenticated = require("../utils/auth");
const Article = require("../models/articlesModel");

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
    authorId: new ObjectId(authorId),
  });

  newComment.save((err) => {
    if (err) return err;
    else {
      Article.findById(articleId, (err, article) => {
        if (err) return err;
        Article.findByIdAndUpdate(
          article._id,
          {
            commentsCount: article.commentsCount + 1,
          },
          (err) => {
            if (err) return err;
            res.json({ message: "comment added" });
          }
        );
      });
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
  Comment.findById(req.params.commentId, (err, comment) => {
    if (err) return err;
    Article.findById(comment.articleId, (err, article) => {
      if (err) return err;
      Article.findByIdAndUpdate(
        article._id,
        {
          commentsCount: article.commentsCount - 1,
        },
        (err) => {
          if (err) return err;
          Comment.findByIdAndDelete(req.params.commentId, (err) => {
            if (err) throw err;
            res.json({ message: "comment deleted" });
          });
        }
      );
    });
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
