import { Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  posts: string[];
}
