const Recipe = require("../models/recipeSchema");
const User = require("../models/userSchema");
const APIFeatures = require("./../utils/apiFeatures");
const Comment = require("../models/commentsSchema");
exports.getAllRecipe = async (req, res, next) => {
  try {
    //console.log(`this is req.query:`, req.query);
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
    //console.log(recipe);
    const { createdBy } = recipe;
    const user = await User.findById(createdBy);
    const { name } = user;
    const comments = await Comment.find({
      recipeId: req.params.id,
    });

    // Map comments to include replies

    // return res.status(200).json({ ...recipe.toObject(), createdBy: name });
    return res.status(200).json({
      ...recipe.toObject(),
      createdBy: name,
      comments: comments,
    });
  } catch (error) {
    console.log("Error in getting a single recipe: ", error);
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
      course,
      mainIngredients,
      allIngredients,
      serving,
      steps,
      mainRegion,
      //createdBy,
      videoLink,
    } = req.body;
    const recipe = await Recipe.findOne({ title });
    if (recipe) {
      return res
        .status(400)
        .json("Recipe already exists. Please add another recipe");
    }
    async function findName(id) {
      const user = await User.findById(id);
      return user.name;
    }
    // let val = await findName(res.locals.id);
    let val = res.locals.id;

    const newRecipe = await Recipe.create({
      title,
      description,
      coverImg,
      isVeg,
      cuisine,
      course,
      mainIngredients,
      allIngredients,
      serving,
      steps,
      mainRegion,
      createdBy: val,
      videoLink,
    });
    const savedRecipe = await newRecipe.save();

    const { _id } = savedRecipe;
    await User.findByIdAndUpdate(val, {
      $push: { recipes: _id },
    });
    res.status(200).json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    //check if the id passed and user id is same before updating

    //console.log(res.locals.id);
    //console.log(req.params.id);

    const findRecipe = await Recipe.findById(req.params.id);

    if (!findRecipe) {
      return new Error("No recipe found by that ID");
    }

    const { createdBy } = findRecipe;

    if (createdBy != res.locals.id) {
      return res
        .status(401)
        .json("You are not authorized to update this recipe");
    }
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const findRecipe = await Recipe.findById(recipeId);
    if (!findRecipe) {
      return new Error("No recipe found by that ID");
    }
    const { createdBy } = findRecipe;
    if (createdBy != res.locals.id) {
      return res
        .status(401)
        .json("You are not authorized to delete this recipe");
    }
    // Delete the recipe
    await Recipe.findByIdAndDelete(recipeId);

    // Remove the recipe ID from the user's recipes array
    await User.findByIdAndUpdate(createdBy, {
      $pull: { recipes: recipeId },
    });
    res.status(200).json("Recipe deleted successfully");
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recipeLikes = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const { likes } = recipe;
    const userId = res.locals.id;
    const isLiked = likes.includes(userId);
    if (!isLiked) {
      await Recipe.findByIdAndUpdate(req.params.id, {
        $push: { likes: userId },
      });
    }
    res.status(200).json({ likes: recipe.likes.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recipeUnlikes = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const { likes } = recipe;
    const userId = res.locals.id;
    const isLiked = likes.includes(userId);
    if (isLiked) {
      await Recipe.findByIdAndUpdate(req.params.id, {
        $pull: { likes: userId },
      });
    }
    return res.status(200).json(recipe.likes.length);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.postRecipesSavedByUser = async (req, res, next) => {
  try {
    const userId = res.locals.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (
      !user.savedRecipes.includes(recipeId) & !recipe.savedBy.includes(userId)
    ) {
      await User.findByIdAndUpdate(userId, {
        $push: { savedRecipes: recipeId },
      });
      await Recipe.findByIdAndUpdate(recipeId, {
        $push: { savedBy: userId },
      });
    }
    return res.status(200).json({ message: "Recipe saved successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.unSaveRecipeByUser = async (req, res, next) => {
  const userId = res.locals.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const recipeId = req.params.id;
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  if (user.savedRecipes.includes(recipeId) & recipe.savedBy.includes(userId)) {
    await User.findByIdAndUpdate(userId, {
      $pull: { savedRecipes: recipeId },
    });
    await Recipe.findByIdAndUpdate(recipeId, {
      $pull: { savedBy: userId },
    });
  }
  return res.status(200).json({ message: "Recipe unSaved by user" });
};

exports.sendRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const user = await Recipe.findById(recipeId);
    if (!user) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const recipeUrl = `https://cuisine-connect-teal.vercel.app/recipe/${recipeId}`;
    return res.status(200).json({ recipeUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
