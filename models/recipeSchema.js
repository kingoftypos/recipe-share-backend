const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A recipe must have a title"],
  },
  description: {
    type: String,
    required: [true, "A recipe must have a description"],
  },
  coverImg: {
    type: String,
    required: [true, "A recipe must have a cover Image"],
  },
  isVeg: {
    type: Boolean,
    required: [true, "A recipe must tell if it is isVeg"],
  },
  cuisine: {
    type: String,
    required: [true, "A recipe must have a cuisine"],
  },
  course: {
    //at what time usually thie meal is eaten
    type: String,
    required: [true, "A recipe must have a meal time"],
  },
  mainIngredients: {
    type: Array,
    required: [true, "A recipe must have a main ingridents"],
  },
  allIngredients: {
    type: Array,
    required: [true, "A recipe must have a all ingridents"],
  },
  serving: {
    type: Number,
    required: [true, "A recipe must have a serving"],
  },
  steps: {
    type: Array,
    required: [true, "A recipe must have a steps"],
  },
  mainRegion: {
    type: Array,
    required: [true, "A recipe must have a main region"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A recipe must have a createdBy"],
  },
  videoLink: {
    type: String,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  savedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
