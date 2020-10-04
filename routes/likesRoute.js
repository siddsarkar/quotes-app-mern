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
const { Article, User, Like } = require("../models");

//utils
const { isAuthenticated } = require("../utils");

/**
 * PROTECTED - add/remove a like
 * Flow:
 * 1. Find a like with the given authorId, articleId in db
 *  1.1 if not found add one and increment likes count with 1 in the article
 *  1.2 if found Delete the like from db and decrement the likescount by 1
 */
router.post("/like/:articleId", isAuthenticated, async (req, res) => {
  const articleId = req.params.articleId;
  const authorId = req.authorId;
  const currentLikes = await Article.findById(articleId, "likesCount").exec();
  const isLiked = await Like.findOne({ authorId, articleId }).exec();

  //see if already liked
  // console.log("Status:", isLiked === null ? "not already liked, Adding Like..." : "liked already, Removing Like...");

  if (isLiked === null) {
    // 1.1 not already liked - add a like
    const author = await User.findById(authorId, "name").exec();
    const post = await Article.findById(articleId, "title").exec();
    const newLike = new Like({
      author: author.name,
      postTitle: post.title,
      authorId: new ObjectId(authorId),
      articleId: new ObjectId(articleId),
    });
    await newLike.save((err) => {
      if (err) return err;
    });
    Article.findByIdAndUpdate(
      articleId,
      { likesCount: currentLikes.likesCount + 1 },
      (err) => {
        if (err) return err;
        // console.log("Status:Like added!");
        res.json({ message: "liked" });
      }
    );
  } else {
    // 1.2 alredy liked - remove the like
    Like.findByIdAndDelete(isLiked._id, (err) => {
      if (err) throw err;
    });
    Article.findByIdAndUpdate(
      articleId,
      { likesCount: currentLikes.likesCount - 1 },
      (err) => {
        if (err) return err;
        // console.log("Status:Like Removed!");
        res.json({ message: "unliked" });
      }
    );
  }
});

//get likes for a given article
router.get("/get/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  Like.find({ articleId }, (err, item) => {
    if (err) throw err;
    else {
      res.json(item);
    }
  });
});

//PROTECTED - get your likes
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
