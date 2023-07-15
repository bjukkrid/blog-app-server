import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/postInterface";

const PostSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  content: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },

  imageUrl: { type: String },
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
