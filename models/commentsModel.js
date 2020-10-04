//base
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

//schema
const CommentSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  articleId: {
    type: ObjectId,
    required: true,
    ref: "Article",
  },
  authorId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
