import { Router } from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  fetchUserById,
  deleteUser,
} from "../controller/UserController.js";

const router = Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", fetchUsers);
router.get("/:id", fetchUserById);
router.delete("/:id", deleteUser);

export default router;
