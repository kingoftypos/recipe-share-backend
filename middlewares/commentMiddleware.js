const Comment = require("../models/commentsSchema");
const { validationResult } = require("express-validator");
const User = require("../models/userSchema");

exports.postComment = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    const { recipeId } = req.params;
    console.log();
    const user = await User.findById(res.locals.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { _id } = user;
    const { comment } = req.body;
    let commentObj = {
      postedBy: _id,
      commentText: comment,
      recipeId: recipeId,
    };
    await new Comment(commentObj).save();
    res.status(201).json({ message: "Comment posted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.replyToComment = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    const { commentId, recipeId } = req.params;
    const userId = res.locals.id;
    const { comment } = req.body;
    const replyObj = {
      postedBy: userId,
      recipeId: recipeId,
      commentText: comment,
      parentComment: commentId,
    };
    const newReply = await new Comment(replyObj).save();
    await Comment.findOneAndUpdate(
      { _id: commentId, recipeId },
      { $push: { replies: newReply._id } }
    );
    res.status(201).json({ message: "Reply posted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// exports.deleteComment = async (req, res, next) => {
//   const { commentId, recipeId } = req.params;
//   const userId = res.locals.id;
//   try {
//     const comment = await Comment.findOne({ _id: commentId, recipeId });
//     console.log(comment);
//     if (comment && comment.postedBy.toString() !== userId) {
//       return res.status(400).json({ error: "Comment failed to delete" });
//     }

//     if (comment.replies !== null) {
//       await Comment.deleteMany({ _id: { $in: comment.replies } });
//     }
//     await Comment.deleteOne({ _id: commentId });
//     return res.status(200).json({ message: "Comment deleted successfully" });
//   } catch (er) {
//     console.log(er.message);
//   }
//   res.redirect(`/${recipeId}#comment-field`);
// };

exports.deleteComment = async (req, res, next) => {
  const { commentId, recipeId } = req.params;
  const userId = res.locals.id;

  try {
    // Find the comment
    const comment = await Comment.findOne({
      _id: commentId,
      recipeId: recipeId,
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user is authorized to delete the comment
    if (comment.postedBy.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this comment" });
    }

    // Delete replies if they exist
    if (comment.replies && comment.replies.length > 0) {
      await Comment.deleteMany({ _id: { $in: comment.replies } });
    }

    // Delete the comment
    await Comment.deleteOne({ _id: commentId });

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
