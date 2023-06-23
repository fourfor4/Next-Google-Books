import { IUser } from "@/interfaces";
import mongoose, { model, Model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const User = (mongoose.models.User ||
  model("User", UserSchema)) as Model<IUser>;
