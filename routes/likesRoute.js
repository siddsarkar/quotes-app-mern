const express = require("express");

const mongoose = require("mongoose");
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
