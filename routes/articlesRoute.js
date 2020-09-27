const express = require("express");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Article = require("../models/articlesModel");
// const Like = require("../models/likesModel");

const router = express.Router();

const isAuthenticated = require("../utils/auth");

router.post("/add", isAuthenticated, (req, res) => {
  const title = req.body.title || "";
  const author = req.body.author || "";
  const body = req.body.body || "";
  const authorId = req.authorId;

  const articleBody = { title, author, body, authorId };

  const newArticle = new Article({
    ...articleBody,
    authorId: new ObjectId(authorId),
  });

  newArticle.save((err) => {
    if (err) return err;
    else {
      res.json({ message: "article added" });
    }
  });
});

router.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    const pageCount = Math.ceil(articles.length / 10);
    let page = parseInt(req.query.p);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }
    res.json({
      page: page,
      pageCount: pageCount,
      posts: articles.slice(page * 10 - 10, page * 10),
    });
    // res.json(articles);
  });
});

router.get("/myarticles", isAuthenticated, (req, res) => {
  const authorId = req.authorId;
  Article.find({ authorId }, (err, articles) => {
    if (err) return err;
    res.json({ articles });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Article.findById({ _id: id }, (err, article) => {
    if (err) throw err;
    res.json(article);
  });
});

router.get("/:authorId/articles", (req, res) => {
  const authorId = req.params.authorId;
  Article.find({ authorId }, (err, articles) => {
    if (err) throw err;
    res.json({ articles });
  });
});

router.delete("/delete/:id", isAuthenticated, (req, res) => {
  Article.deleteOne({ _id: req.params.id }, (err) => {
    res.json({ success: "success" });
  });
});

router.post("/edit/:id", isAuthenticated, (req, res) => {
  const title = req.body.title || "";
  const author = req.body.author || "";
  const body = req.body.body || "";
  const authorId = req.authorId;

  const updatedArticle = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    authorId: new ObjectId(authorId),
  };

  Article.findByIdAndUpdate(req.params.id, updatedArticle, (err) => {
    if (err) throw err;
    else res.json({ success: "success" });
  });
});

module.exports = router;
