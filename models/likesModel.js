//base
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema
const LikeSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
  authorId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  articleId: {
    type: ObjectId,
    required: true,
    ref: "Article",
  },
  addedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
