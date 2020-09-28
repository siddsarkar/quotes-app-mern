const express = require("express");

const mongoose = require("mongoose");
const Article = require("../models/articlesModel");
const Like = require("../models/likesModel");
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();

const isAuthenticated = require("../utils/auth");

router.post("/like/:articleId", isAuthenticated, (req, res) => {
  const articleId = req.params.articleId;
  const authorId = req.authorId;

  const doStuff = (item) => {
    if (item === null) {
      const newLike = new Like({
        authorId: new ObjectId(authorId),
        articleId: new ObjectId(articleId),
      });
      Article.findById(articleId, (err, item) => {
        if (err) return;
        Article.findByIdAndUpdate(
          articleId,
          { likesCount: item.likesCount + 1 },
          (err) => {
            if (err) throw err;
            res.json({ message: "liked" });
          }
        );
      });
      newLike.save((err) => {
        if (err) return err;
      });
    } else {
      Article.findById(articleId, (err, item) => {
        if (err) return;
        Article.findByIdAndUpdate(
          articleId,
          { likesCount: item.likesCount - 1 },
          (err) => {
            if (err) throw err;
            res.json({ message: "unliked" });
          }
        );
      });
      Like.findByIdAndDelete(item._id, (err) => {
        if (err) return err;
        // res.json({ message: "unliked" });
      });
    }
  };

  Like.findOne({ authorId, articleId }, (err, item) => {
    if (err) return err;
    doStuff(item);
  });
});

router.get("/get/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  Like.find({ articleId }, (err, item) => {
    if (err) throw err;
    else {
      res.json(item);
    }
  });
});

router.get("/mylikes", isAuthenticated, (req, res) => {
  const authorId = req.authorId;
  Like.find({ authorId }, (err, item) => {
    if (err) throw err;
    else {
      res.json(item);
    }
  });
});

module.exports = router;
