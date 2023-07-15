import { Request, Response } from "express";
import Author from "../models/author";
import mongoose from "mongoose";
import { HandleErrorResponse, HandleSuccessResponse } from "../utils";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    return HandleSuccessResponse(res, authors);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
};

async function createAuthor(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name,
    });
    await author.save();
    return HandleSuccessResponse(res, author);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
}

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return HandleErrorResponse(res, "Author not found");
    }
    return HandleSuccessResponse(res, author);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!author) {
      return HandleErrorResponse(res, "Author not found");
    }
    return HandleSuccessResponse(res, author);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndRemove(req.params.id);
    if (!author) {
      return HandleErrorResponse(res, "Author not found");
    }
    return HandleSuccessResponse(res, author);
  } catch (error) {
    return HandleErrorResponse(res, error);
  }
};
