const express = require("express");
const cors = require("cors");
const router = express.Router();
const recipeMiddleware = require("../middlewares/recipeMiddleware");
const corsMiddelware = require("../middlewares/corsMiddleware");
const authController = require("../controllers/authController");

router.use(cors());

router.get("/", corsMiddelware, recipeMiddleware.getAllRecipe);
router.get("/:id", corsMiddelware, recipeMiddleware.getRecipeById);
router.get("/sharerecipe/:id", corsMiddelware, recipeMiddleware.sendRecipe);
router.post(
  "/",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.createRecipe
);

router.patch(
  "/likerecipes/:id",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.recipeLikes
);
router.patch(
  "/saverecipes/:id",
  corsMiddelware,
  authController.protect,
  recipeMiddleware.postRecipesSavedByUser
);
router.patch(
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
