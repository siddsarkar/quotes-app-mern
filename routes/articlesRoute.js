const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Article = require("../models/articlesModel");

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const authorizationToken = authorizationHeader.split(" ")[1];
  if (authorizationToken) {
    jwt.verify(authorizationToken, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else {
        req.authorId = decoded.id;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

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

router.delete("/delete/:id", isAuthenticated, (req, res) => {
  Article.remove({ _id: req.params.id }, (err) => {
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
