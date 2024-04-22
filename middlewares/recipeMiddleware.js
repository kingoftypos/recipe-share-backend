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
      serving,
      course,
      mainRegion,
      createdBy,
      videoLink,
    } = req.body;
    const newRecipe = await Recipe.create({
      title,
      description,
      coverImg,
      isVeg,
      cuisine,
      mealTime,
      course,
      serving,
      mainIngredients,
      steps,
      mainRegion,
      createdBy,
      videoLink,
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!recipe) {
      return new Error("No recipe found by that ID");
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json("Recipe deleted successfully");
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
