const { validationResult } = require("express-validator");
const CategoryModel = require("../model/category.model");

class Category {
  // *****  create Category  ******
  async create(req, res) {
    const errors = validationResult(req);
    const { name } = req.body;
    if (errors.isEmpty()) {
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        await CategoryModel.create({ name });
        return res.status(201).json({
          message: ` " ${name} " category has created SUCCESSFULLY !`,
        });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${name} category is already exist !` }] });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  // ******* get category ********
  async getCategories(req, res) {
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;
    try {
      const count = await CategoryModel.find({}).countDocuments();

      const response = await CategoryModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });

      return res.status(200).json({ categories: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }

  //  ******  fetch category   ******
  async fetchCategory(req, res) {
    const { id } = req.params;
    try {
      const result = await CategoryModel.findById(id);
      // const result = await CategoryModel.find({ _id: id });
      return res.status(200).json({ category: result });
    } catch (error) {
      console.log(error.message);
    }
  }

  // ******  update category *******
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        // const result = await CategoryModel.updateOne(
        //   { _id: id },
        //   { $set: {name} }
        // );

        const result = await CategoryModel.findByIdAndUpdate(
          id,
          { name },
          { new: true }
        );
        return res.status(201).json({
          message: ` Category Updated to "${result.name}" SUCCESSFULLY ! `,
        });
      } else {
        return res.status(400).json({
          errors: [{ msg: ` " ${name} " category is already exist !` }],
        });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  // ******* delete category   ********
  async deleteCategory(req, res) {
    const { id } = req.params;
    const deletedCategory = await CategoryModel.findById(id);
    try {
      await CategoryModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ msg: `" ${deletedCategory.name} " has been DELETED !` });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  // ********  all categories  *********
  async allCategories(req, res) {
    try {
      const categories = await CategoryModel.find({});
      res.status(200).json({ categories });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

  // ******** getting random categories  ********

  async randomCategories(req, res) {
    try {
      const categories = await CategoryModel.aggregate([
        { $sample: { size: 3 } },
      ]);
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json("Server internal error !");
    }
  }
}
module.exports = new Category();
