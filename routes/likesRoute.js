const express = require("express");
const mongoose = require("mongoose");
const Article = require("../models/articlesModel");
const Like = require("../models/likesModel");
const User = require("../models/usersModel");
const ObjectId = mongoose.Types.ObjectId;

const router = express.Router();
const isAuthenticated = require("../utils/auth");

router.post("/like/:articleId", isAuthenticated, async (req, res) => {
  const articleId = req.params.articleId;
  const authorId = req.authorId;

  const currentLikes = await Article.findById(articleId, "likesCount").exec();
  const isLiked = await Like.findOne({ authorId, articleId }).exec();

  // console.log(
  //   "Status:",
  //   isLiked === null
  //     ? "not already liked, Adding Like..."
  //     : "liked already, Removing Like..."
  // );

  if (isLiked === null) {
    //! not already liked - add a like
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
    //! alredy liked - remove the like
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
