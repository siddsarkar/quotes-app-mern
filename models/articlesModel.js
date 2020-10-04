//base
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: ["uncategorised"],
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  body: {
    type: String,
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
