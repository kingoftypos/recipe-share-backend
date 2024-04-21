const express = require("express");
const cors = require("cors");
const router = express.Router();
const recipeMiddleware = require("../middlewares/recipeMiddleware");
router.use(cors());

router.get("/", recipeMiddleware.getAllRecipe);
router.get("/:id", recipeMiddleware.getRecipeById);
router.post("/createrecipe", recipeMiddleware.createRecipe);
module.exports = router;
