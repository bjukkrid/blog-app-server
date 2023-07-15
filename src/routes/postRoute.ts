import express from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = express.Router();

// Get all posts
router.get("/", getAllPosts);

// Create a new post
router.post("/", createPost);

// Get a single post by ID
router.get("/:id", getPostById);

// Update a post by ID
router.put("/:id", updatePost);

// Delete a post by ID
router.delete("/:id", deletePost);

export default router;
