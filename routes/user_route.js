import express from "express";
import mongoose from "mongoose";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/user_controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/", authenticateUser, updateUser);
router.delete("/", authenticateUser, deleteUser);
router.post("/login", loginUser);

export default router;
