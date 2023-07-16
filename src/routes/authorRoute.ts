import express from "express";
import { getAllAuthors, createAuthor } from "../controllers/authorController";

const router = express.Router();

// Get all posts
router.get("/", getAllAuthors);

// Create a new post
router.post("/", createAuthor);

export default router;
