import mongoose from "mongoose";
import Author from "../models/author";
import Post from "../models/post";
import { IAuthor } from "../interfaces/authorInterface";
import { IPost } from "../interfaces/postInterface";

async function getPostById(id: string): Promise<IPost> {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
}

// Controller functions
async function getAllPosts(): Promise<IPost[]> {
  try {
    const posts = await Post.find();
    return posts;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function createPost(
  title: string,
  content: string,
  author: string,
  imageUrl: string
): Promise<IPost> {
  try {
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      author,
      imageUrl,
    });
    await post.save();

    await Author.findByIdAndUpdate(author, {
      $push: { posts: post._id },
    });

    return post;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function updatePost(
  id: string,
  title: string,
  content: string,
  author: string,
  imageUrl: string
): Promise<IPost> {
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content, author, imageUrl },
      { new: true }
    );
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

async function deletePost(id: string): Promise<{ message: string }> {
  try {
    const post = await Post.findByIdAndRemove(id);
    if (!post) {
      throw new Error("Post not found");
    }

    await Author.findByIdAndUpdate(post.author, {
      $pull: { posts: post._id },
    });

    return { message: "Post deleted" };
  } catch (err) {
    throw new Error(`${err}`);
  }
}

// Resolvers
const resolvers = {
  Query: {
    getAllPosts,
    getPostById: (_: any, { id }: { id: string }) => getPostById(id),
  },
  Mutation: {
    createPost: (
      _: any,
      {
        title,
        content,
        author,
        imageUrl,
      }: {
        title: string;
        content: string;
        author: string;
        imageUrl: string;
      }
    ) => createPost(title, content, author, imageUrl),
    updatePost: (
      _: any,
      {
        id,
        title,
        content,
        author,
        imageUrl,
      }: {
        id: string;
        title: string;
        content: string;
        author: string;
        imageUrl: string;
      }
    ) => updatePost(id, title, content, author, imageUrl),
    deletePost: (_: any, { id }: { id: string }) => deletePost(id),
  },
};

export default resolvers;
