import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abraham:nazvidanie123@cluster0.adifs8j.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
