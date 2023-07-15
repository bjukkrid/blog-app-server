import { Document } from "mongoose";

export interface IAuthor extends Document {
  _id: string;
  name: string;
  posts: string[];
}
