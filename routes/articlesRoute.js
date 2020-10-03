const express = require("express");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Article = require("../models/articlesModel");

const router = express.Router();

const isAuthenticated = require("../utils/auth");
const paginatedResponse = require("../utils/pagination");

router.post("/add", isAuthenticated, (req, res) => {
  const title = req.body.title || "";
  const author = req.body.author || "";
  const body = req.body.body || "";
  const authorId = req.authorId;
  const tags = req.body.tags;

  const articleBody = { title, tags, author, body, authorId };

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
    if (err) throw err;
    let paginated = paginatedResponse(articles, req.query.p);
    res.json(paginated);
  });
});

//* search feature */
router.get("/search", (req, res) => {
  let keyword = req.query.q;
  Article.find({}, (err, articles) => {
    if (err) throw err;
    let matches = articles.filter((article) => {
      const regex = new RegExp(`${keyword}`, "gi");
      return article.title.match(regex) || article.body.match(regex);
    });
    let paginated = paginatedResponse(matches, req.query.p);
    res.json(paginated);
  });
});

//* get by tags */
router.get("/tags", (req, res) => {
  const [first, ...rest] = Object.values(req.query);
  Article.find({ tags: [first, ...rest] }, (err, articles) => {
    if (err) throw err;
    res.json(articles);
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
