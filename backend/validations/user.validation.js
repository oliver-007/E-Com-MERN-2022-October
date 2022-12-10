const { body } = require("express-validator");

const registerValidations = [
  body("name").not().notEmpty().trim().escape().withMessage("name is required"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .escape()
    .trim()
    .withMessage("valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .escape()
    .withMessage("password's length should be min 6"),
];

const loginValidations = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("Valid E-mail is required !!"),

  body("password").not().isEmpty().withMessage("Password is required"),
];

module.exports = { registerValidations, loginValidations };
