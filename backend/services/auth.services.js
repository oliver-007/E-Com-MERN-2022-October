const bcrypt = require("bcrypt");
const saltRounds = 12;

const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_JWT = process.env.SECRET_KEY;

// ***** password hashing *****
const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// ******  compare password  *******
const comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

// ***** jwt token create  *****
const createToken = (jwtPayload) => {
  return jwt.sign(jwtPayload, SECRET_JWT, { expiresIn: "1d" });
};

module.exports = { hashPassword, comparePassword, createToken };
