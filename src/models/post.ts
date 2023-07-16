import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/postInterface";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
