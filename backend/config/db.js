const mongoose = require("mongoose");
require("dotenv").config();

const db_url = process.env.DB_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("Database Connected ✔");
  } catch (error) {
    console.log(error.message);
    process.exit;
  }
};

module.exports = dbConnect;
