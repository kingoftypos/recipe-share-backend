const Recipe = require("../models/recipeSchema");

exports.getAllRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.find({});
    res.status(200).json(recipe);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      description,
      coverImg,
      isVeg,
      cuisine,
      mealTime,
      mainIngredients,
      steps,
      mainRegion,
      createdB,
      videoLink,
    } = req.body;
    const newRecipe = await Recipe.create({
      title,
      description,
      coverImg,
      isVeg,
      cuisine,
      mealTime,
      mainIngredients,
      steps,
      mainRegion,
      createdB,
      videoLink,
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
