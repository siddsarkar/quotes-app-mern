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
const { Article } = require("../models");
//utils
const { isAuthenticated, paginatedResponse } = require("../utils");

// PROTECTED - add an article
router.post("/add", isAuthenticated, (req, res) => {
  const title = req.body.title || "";
  const author = req.body.author || "";
  const body = req.body.body || "";
  const authorId = req.authorId;
  const tags = req.body.tags || [];
  const newArticle = new Article({
    title,
    body,
    tags,
    author,
    authorId: new ObjectId(authorId),
  });
  newArticle.save((err) => {
    if (err) return err;
    else {
      res.json({ message: "article added" });
    }
  });
});

//get all articles by page (10 per page)
router.get("/", (req, res) => {
  const aggregate = Article.aggregate([
    {
      $sort: {
        addedOn: -1,
      },
    },
  ]);
  aggregate.exec((err, articles) => {
    if (err) throw err;
    let paginated = paginatedResponse(articles, req.query.p);
    res.json(paginated);
  });
});

//search feature eg:"/search?q=love&p=1" gives post with love keyword in it
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

//get by tags  eg:"/tags?t=love&p=1" ; gives first page of "love" tagged posts
router.get("/tags", (req, res) => {
  // const [first, ...rest] = Object.values(req.query);
  Article.find({ tags: req.query.t }, (err, articles) => {
    if (err) throw err;
    let paginated = paginatedResponse(articles, req.query.p);
    res.json(paginated);
  });
});

// PROTECTED - get your articles
router.get("/myarticles", isAuthenticated, (req, res) => {
  const authorId = req.authorId;
  Article.find({ authorId }, (err, articles) => {
    if (err) return err;
    res.json({ articles });
  });
});

//get articles by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Article.findById({ _id: id }, (err, article) => {
    if (err) throw err;
    res.json(article);
  });
});

//get articles by a user with their id
router.get("/:authorId/articles", (req, res) => {
  const authorId = req.params.authorId;
  Article.find({ authorId }, (err, articles) => {
    if (err) throw err;
    res.json({ articles });
  });
});

// PROTECTED - delete an article
router.delete("/delete/:id", isAuthenticated, (req, res) => {
  Article.findByIdAndDelete(req.params.id, (err) => {
    res.json({ success: "success" });
  });
});

// PROTECTED - edit a article
router.post("/edit/:id", isAuthenticated, (req, res) => {
  const title = req.body.title || "";
  const author = req.body.author || "";
  const body = req.body.body || "";
  const authorId = req.authorId;
  const updatedArticle = {
    title,
    body,
    author,
    authorId: new ObjectId(authorId),
  };
  Article.findByIdAndUpdate(req.params.id, updatedArticle, (err) => {
    if (err) throw err;
    else res.json({ success: "success" });
  });
});

module.exports = router;
