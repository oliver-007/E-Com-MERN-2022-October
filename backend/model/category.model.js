const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("categorie", categorySchema);

module.exports = CategoryModel;
