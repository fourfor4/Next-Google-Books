import { connect, connection } from "mongoose";
const {
  MONGO_URI = "mongodb+srv://ivarduserud0322:WFRK8EBks2beMqWA@cluster0.gysrhiz.mongodb.net/popcorn",
} = process.env;

const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  if (!connection.readyState) {
    console.log("Connecting to ", MONGO_URI);
    try {
      await connect(MONGO_URI, options);
      console.log("Connected MongoDB successfully!");
    } catch (error) {
      console.log("Failed to Connect MongoDB!");
    }
  }
};
