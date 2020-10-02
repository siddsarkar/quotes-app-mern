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

  const saveLike = () => {
    const newLike = new Like({
      authorId: new ObjectId(authorId),
      articleId: new ObjectId(articleId),
    });
    newLike.save((err) => {
      if (err) return err;
      res.json({ message: "liked" });
    });
  };

  const removeLike = (id) => {
    Like.findByIdAndDelete(id, (err) => {
      if (err) return err;
      res.json({ message: "unliked" });
    });
  };

  const callback = (item) => {
    if (item === null) {
      Article.findById(articleId, (err, article) => {
        if (err) return err;
        Article.findByIdAndUpdate(
          articleId,
          { likesCount: article.likesCount + 1 },
          (err) => {
            if (err) return err;
            saveLike();
          }
        );
      });
    } else {
      Article.findById(articleId, (err, article) => {
        if (err) return err;
        Article.findByIdAndUpdate(
          articleId,
          { likesCount: article.likesCount - 1 },
          (err) => {
            if (err) return err;
            removeLike(item._id);
          }
        );
      });
    }
  };

  Like.findOne({ authorId, articleId }, (err, item) => {
    if (err) return err;
    callback(item);
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
