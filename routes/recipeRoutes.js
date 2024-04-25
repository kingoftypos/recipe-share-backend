const express = require("express");
const cors = require("cors");
const router = express.Router();
const recipeMiddleware = require("../middlewares/recipeMiddleware");
const authController = require("../controllers/authController");
router.use(cors());

router.get("/", recipeMiddleware.getAllRecipe);
router.post("/", authController.protect, recipeMiddleware.createRecipe);
router.get("/:id", recipeMiddleware.getRecipeById);
router.delete("/:id", authController.protect, recipeMiddleware.deleteRecipe);
router.patch("/:id", authController.protect, recipeMiddleware.updateRecipe);

module.exports = router;
