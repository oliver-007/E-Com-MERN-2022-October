const router = require("express").Router();

const Category = require("../controllers/Category");
const Authorization = require("../services/Authorization");
const categoryValidations = require("../validations/category.validation");

router.post(
  "/create-category",
  [categoryValidations, Authorization.authorized],
  Category.create
);

router.get(
  "/categories/:page",
  Authorization.authorized,
  Category.getCategories
);

router.get(
  "/fetch-category/:id",
  Authorization.authorized,
  Category.fetchCategory
);

router.put("/update-category/:id", [
  categoryValidations,
  Authorization.authorized,
  Category.updateCategory,
]);

router.delete(
  "/delete-category/:id",
  Authorization.authorized,
  Category.deleteCategory
);

router.get("/random-categories", Category.randomCategories);

router.get("/allcategories", Category.allCategories);

module.exports = router;
