const mongoose = require("mongoose");
require("dotenv").config();

//const mongoURL = "mongodb://127.0.0.1:27017/mydatabase";

// 👉 your MongoDB Atlas connection string
//const mongoURL = "mongodb+srv://SAG:Krish9435@cluster0.ksv6ar5.mongodb.net/?retryWrites=true&w=majority";
const mongoURL = process.env.DB_URL;
//const mongoURL = process.env.DB_URL_LOCAL;

// connect to MongoDB
mongoose.connect(mongoURL);

// connection object
const db = mongoose.connection;

// events
db.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

db.on("error", (err) => {
  console.log("MongoDB error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;