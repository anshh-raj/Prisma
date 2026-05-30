import { Router } from "express";
import {
  createPost,
  updatePost,
  fetchPosts,
  fetchPostById,
  deletePost,
  searchPosts,
} from "../controller/PostController.js";

const router = Router();

router.get("/search", searchPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.get("/", fetchPosts);
router.get("/:id", fetchPostById);
router.delete("/:id", deletePost);

export default router;
