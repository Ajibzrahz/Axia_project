import express from "express";
import mongoose from "mongoose";
import { createUser, getUsers, updateUser, deleteUser, loginUser } from "../controllers/user_controller.js";

const router = express.Router()

router.post("/", createUser)
router.get("/", getUsers)
router.put("/", updateUser)
router.delete("/", deleteUser)
router.post("/login", loginUser)

export default router