const express = require("express");
const cors = require("cors");
const router = express.Router();
const recipeMiddleware = require("../middlewares/recipeMiddleware");
const corsMiddelware = require("../middlewares/corsMiddleware");
const authController = require("../controllers/authController");

router.use(cors());

router.get("/", corsMiddelware, recipeMiddleware.getAllRecipe);
router.post(
  "/",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.createRecipe
);
router.get("/:id", corsMiddelware, recipeMiddleware.getRecipeById);
router.post(
  "/likerecipes/:id",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.recipeLikes
);
router.post(
  "/saverecipes/:id",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.postRecipesSavedByUser
);
router.post(
  "/unlike/:id",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.recipeUnlikes
);
router.delete(
  "/:id",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.deleteRecipe
);
router.patch(
  "/:id",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.updateRecipe
);

module.exports = router;
