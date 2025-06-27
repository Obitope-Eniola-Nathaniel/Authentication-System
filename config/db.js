const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);

    // Exit the process with a failure code (1 = failure)
    process.exit(1);
  }
};

module.exports = connectDB;
