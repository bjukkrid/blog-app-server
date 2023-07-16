import mongoose, { Error } from "mongoose";
import Author from "../models/author";
import Post from "../models/post";
import { IAuthor } from "../interfaces/authorInterface";
import { IPost } from "../interfaces/postInterface";

// Common functions used by both controller and resolvers
async function getAuthorById(id: string): Promise<IAuthor> {
  const author = await Author.findById(id);
  if (!author) {
    throw new Error("Author not found");
  }
  return author;
}

async function updateAuthor(id: string, name: string): Promise<IAuthor> {
  const author = await Author.findByIdAndUpdate(id, { name }, { new: true });
  if (!author) {
    throw new Error("Author not found");
  }
  return author;
}

// Controller functions
async function getAllAuthors(): Promise<IAuthor[]> {
  try {
    const authors = await Author.find();
    return authors;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function createAuthor(name: string): Promise<IAuthor> {
  try {
    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name: name,
    });
    await author.save();
    return author;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function deleteAuthor(id: string): Promise<{ message: string }> {
  try {
    const author = await Author.findByIdAndRemove(id);
    if (!author) {
      throw new Error("Author not found");
    }

    await Post.updateMany({ author: author._id }, { $unset: { author: "" } });

    return { message: "Author deleted" };
  } catch (err) {
    throw new Error(`${err}`);
  }
}

// Resolvers
const resolvers = {
  Query: {
    getAllAuthors,
    getAuthorById: (_: any, { id }: { id: string }) => getAuthorById(id),
  },
  Mutation: {
    createAuthor: (_: any, { name }: { name: string }) => createAuthor(name),
    updateAuthor: (_: any, { id, name }: { id: string; name: string }) =>
      updateAuthor(id, name),
    deleteAuthor: (_: any, { id }: { id: string }) => deleteAuthor(id),
  },
};

export default resolvers;
