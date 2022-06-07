require("dotenv").config();

const productData = require("./data/products");
const discussionData = require("./data/discussions");
const userData = require("./data/users");

const connectDB = require("./config/db");

const Product = require("./models/Product");
const Discussion = require("./models/Discussion");
const User = require("./models/User");

connectDB();
const importData = async () => {
  try {
    await Product.deleteMany({});
    await Discussion.deleteMany({});
    await User.deleteMany({});

    await Product.insertMany(productData);
    await Discussion.insertMany(discussionData);
    await User.insertMany(userData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
