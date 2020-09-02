const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const LikeSchema = mongoose.Schema({
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
