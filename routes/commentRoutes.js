const express = require("express");
const cors = require("cors");
const router = express.Router();

const { body } = require("express-validator");
const authController = require("../controllers/authController");
const commentMiddleware = require("../middlewares/commentMiddleware");
const corsMiddelware = require("../middlewares/corsMiddleware");

router.use(cors());

router.get("/:id", corsMiddelware, commentMiddleware.getCommentsByRecipeId);

router.post(
  "/:recipeId",
  corsMiddelware,
  authController.protect,
  [
    body("comment")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Comment field can not be empty!"),
  ],
  commentMiddleware.postComment
);

router.post(
  "/:commentId/reply/:recipeId",
  corsMiddelware,
  authController.protect,
  [body("replyText").trim().escape().notEmpty()],
  commentMiddleware.replyToComment
);

router.delete(
  "/:commentId/delete/:recipeId",
  corsMiddelware,
  authController.protect,
  commentMiddleware.deleteComment
);

module.exports = router;
