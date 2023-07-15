import mongoose, { Schema } from "mongoose";
import { IAuthor } from "../interfaces/authorInterface";

const AuthorSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Author = mongoose.model<IAuthor>("Author", AuthorSchema);

export default Author;
