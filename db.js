const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;