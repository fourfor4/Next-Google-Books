import { IBook } from "@/interfaces";
import mongoose, { model, Model, Schema } from "mongoose";

const BookSchema: Schema = new Schema({
  id: String,
  volumeInfo: {
    title: String,
    authors: [String],
    publisher: String,
    imageLinks: {
      smallThumbnail: String,
      thumbnail: String,
    },
    description: String,
  },
  saleInfo: {
    country: String,
    buyLink: String,
  },
  userId: {
    type: String,
    require: true,
  },
});

export const Book = (mongoose.models.Book ||
  model("Book", BookSchema)) as Model<IBook>;
