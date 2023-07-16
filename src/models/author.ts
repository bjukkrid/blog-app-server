import mongoose, { Schema } from "mongoose";
import { IAuthor } from "../interfaces/authorInterface";

const AuthorSchema = new Schema(
  {
    name: { type: String, required: true },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Author = mongoose.model<IAuthor>("Author", AuthorSchema);

export default Author;
