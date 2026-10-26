const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGOOSE_URI;

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
};

module.exports = connectDB;
