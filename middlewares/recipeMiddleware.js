const Recipe = require("../models/recipeSchema");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllRecipe = async (req, res, next) => {
  try {
    console.log(`this is req.query:`, req.query);
    //const recipe = await Recipe.find(req.query);
    const features = new APIFeatures(Recipe.find(), req.query)
      .filter()
      .paginate();
    // // .sort()
    // // .limitFields()

    const recipe = await features.query;

    res.status(200).json({
      length: recipe.length,
      recipe,
    });
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
      coverimg,
      isveg,
      cuisine,
      mealtime,
      mainingredients,
      allingridents,
      steps,
      serving,
      course,
      mainregion,
      createdby,
      videolink,
    } = req.body;
    const recipe = await Recipe.findOne({ title });
    if (recipe) {
      return res
        .status(400)
        .json("Recipe already exists. Please add another recipe");
    }
    const newRecipe = await Recipe.create({
      title,
      description,
      coverimg,
      isveg,
      cuisine,
      mealtime,
      mainingredients,
      allingridents,
      steps,
      serving,
      course,
      mainregion,
      createdby,
      videolink,
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
