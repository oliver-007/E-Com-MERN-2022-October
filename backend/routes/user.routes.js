const router = require("express").Router();

const { userRegister, userLogin } = require("../controllers/users.controller");
const {
  registerValidations,
  loginValidations,
} = require("../validations/user.validation");

router.post("/register", registerValidations, userRegister);

router.post("/login", loginValidations, userLogin);

module.exports = router;
