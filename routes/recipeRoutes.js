const express = require("express");
const cors = require("cors");
const router = express.Router();
const recipeMiddleware = require("../middlewares/recipeMiddleware");
router.use(cors());

router.get("/", recipeMiddleware.getAllRecipe);
router.get("/:id", recipeMiddleware.getRecipeById);
router.post("/createrecipe", recipeMiddleware.createRecipe);
router.delete("/:id", recipeMiddleware.deleteRecipe);
router.patch("/:id", recipeMiddleware.updateRecipe);

module.exports = router;
