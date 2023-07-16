import { Request, Response } from "express";
import Post from "../models/post";
import Author from "../models/author";
import mongoose from "mongoose";
import { HandleSuccessResponse, HandleErrorResponse } from "../utils";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    return HandleSuccessResponse(res, posts);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId, imageUrl } = req.body.variables;

    // Check if the author exists
    const author = await Author.findById(authorId);
    if (!author) {
      return HandleErrorResponse(res, "Author not found");
    }

    const post = new Post({
      title,
      content,
      author: authorId,
      imageUrl,
    });
    await post.save();

    author.posts.push(post._id);
    await author.save();

    // const authorUpdate = await Author.findByIdAndUpdate(author, {
    //   $push: { posts: post._id },
    // });
    // console.log(authorUpdate);

    return HandleSuccessResponse(res, post);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      HandleErrorResponse(res, "Post not found");
    }

    return HandleSuccessResponse(res, post);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content, author, imageUrl } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author, imageUrl },
      { new: true }
    );
    if (!post) {
      return HandleErrorResponse(res, "Post not found");
    }
    return HandleSuccessResponse(res, post);
  } catch (error) {
    return HandleErrorResponse(res, "Failed to update post");
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) {
      return HandleErrorResponse(res, "Post not found");
    }
    return HandleSuccessResponse(res, post);
  } catch (error) {
    return HandleErrorResponse(res, "Failed to update post");
  }
};
