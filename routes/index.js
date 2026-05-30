import { Router } from "express";
import userRoutes from "./UserRoutes.js";
import postRoutes from "./PostRoutes.js";
import commentRoutes from "./ComentRoutes.js";

const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/post", postRoutes);
router.use("/api/comment", commentRoutes);

export default router;
