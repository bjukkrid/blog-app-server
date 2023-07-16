import { Document } from "mongoose";
import { IAuthor } from "./authorInterface";
export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  imageUrl: string;
}
