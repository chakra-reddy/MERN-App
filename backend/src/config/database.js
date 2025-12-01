import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully", mongoose.connection.host);
  } catch (error) {
    console.log("Error connecting DB: ", error);
  }
};

export default connectDB;
