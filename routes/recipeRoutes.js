const express = require("express");
const cors = require("cors");
const router = express.Router();
const recipeMiddleware = require("../middlewares/recipeMiddleware");
router.use(cors());

router.get("/", recipeMiddleware.getAllRecipe);
router.get("/:id");

module.exports = router;
