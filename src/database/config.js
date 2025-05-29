const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("-> Database connected sucesfully");
  } catch (error) {
    console.log(error);
    throw new Error("Database Error!!");
  }
};

module.exports = {
  dbConnection,
};
