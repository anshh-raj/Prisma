import { Router } from "express";
import {
  createComment,
  updateComment,
  fetchComments,
  fetchCommentById,
  deleteComment,
} from "../controller/CommentController.js";

const router = Router();

router.post("/", createComment);
router.put("/:id", updateComment);
router.get("/", fetchComments);
router.get("/:id", fetchCommentById);
router.delete("/:id", deleteComment);

export default router;
