/**
 * ?RULES:
 * *PROTECTED ROUTES REQUIRES USERS TO BE AUTHENTICATED
 */

//base
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//models
const { Article, Comment } = require("../models");

//utils
const { isAuthenticated } = require("../utils");

//add a comment
router.post("/add/:articleId", isAuthenticated, (req, res) => {
  const comment = req.body.comment;
  const author = req.body.author;
  const authorId = req.authorId;
  const articleId = req.params.articleId;
  const newComment = new Comment({
    comment,
    author,
    authorId: new ObjectId(authorId),
    articleId: new ObjectId(articleId),
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

//get comments for a article
router.get("/get/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  Comment.find({ articleId }, (err, comments) => {
    if (err) throw err;
    else {
      res.json(comments);
    }
  });
});

//PROTECTED - Delete a comment by comment id
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

//PROTECTED - get your comments
router.get("/mycomments", isAuthenticated, (req, res) => {
  const authorId = req.authorId;
  Comment.find({ authorId }, (err, mycomments) => {
    if (err) return err;
    res.json({ mycomments });
  });
});

module.exports = router;
