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
  coverimg: {
    type: String,
    required: [true, "A recipe must have a cover Image"],
  },
  isveg: {
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
  mainingredients: {
    type: Array,
    required: [true, "A recipe must have a main ingridents"],
  },
  allingredients: {
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
  mainregion: {
    type: Array,
    required: [true, "A recipe must have a main region"],
  },
  createdby: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    // required: [true, "A recipe must have a createdBy"],
    type: String,
    required: [true, "A recipe must have a createdBy"],
  },
  videolink: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
