const { body } = require("express-validator");

const categoryValidations = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("category is required"),
];

module.exports = categoryValidations;
