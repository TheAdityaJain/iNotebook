const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.12",
      {}
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongo;
