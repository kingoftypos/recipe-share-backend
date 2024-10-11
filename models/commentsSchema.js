const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A comment must have a postedBy"],
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: [true, "A comment must have a recipeId"],
  },
  commentText: {
    type: String,
    required: [true, "A comment must have a commentText"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null, // root comment doesn't have parent comment
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

commentSchema.pre("find", function (next) {
  this.populate({ path: "replies", populate: { path: "postedBy" } });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
