const { validationResult } = require("express-validator");

const UserModel = require("../model/user.model");
const {
  hashPassword,
  createToken,
  comparePassword,
} = require("../services/auth.services");

//  ********  user Register    *******
const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (!emailExist) {
        const hashedPass = await hashPassword(password);
        const newUser = await UserModel.create({
          name: name,
          email: email,
          password: hashedPass,
          // admin: true,
        });

        // ****** JWT token ******
        const jwtPayload = {
          id: newUser._id,
          name: newUser.name,
        };
        const token = createToken(jwtPayload);

        return res
          .status(201)
          .json({ msg: "Your account has been created !", token });
      } else {
        res.status(400).json({
          errors: [{ msg: `${email} is already taken`, param: "email" }],
        });
      }
    } catch (error) {
      res.status(500).json({ msg: `${error.message}` });
    }
  } else {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

// ******** user login  *********
const userLogin = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      // console.log(user);
      if (user) {
        if (user.admin) {
          const passwordMatch = await comparePassword(password, user.password);
          if (passwordMatch) {
            // ****  jwt token create  ****
            const jwtPayload = {
              id: user._id,
              name: user.name,
            };
            const token = createToken(jwtPayload);
            return res.status(201).json({ token, admin: true });
          } else {
            return res.status(400).json({
              errors: [
                {
                  msg: "Password doesn't match !",
                  param: "password",
                },
              ],
            });
          }
        } else if (!user.admin) {
          const passwordMatch = await comparePassword(password, user.password);
          if (passwordMatch) {
            // ****  jwt token create  ****
            const jwtPayload = {
              id: user._id,
              name: user.name,
            };
            const token = createToken(jwtPayload);
            return res.status(201).json({ token, admin: false });
          } else {
            return res.status(400).json({
              errors: [
                {
                  msg: "Password doesn't match !",
                  param: "password",
                },
              ],
            });
          }
        } else {
          return res.status(400).json({
            admin: false,
            errors: [{ msg: ` " ${user.email} " is not Admin ` }],
          });
        }
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: `${email} not found !`, param: "email" }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  } else {
    console.log(errors);
    res.status(400).json({ errors: errors.array() });
  }
};

module.exports = { userRegister, userLogin };
