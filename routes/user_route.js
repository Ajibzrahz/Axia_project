import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  singleUser,
  getAllUser,
} from "../controllers/user_controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", authenticateUser, singleUser);
router.put("/", authenticateUser, updateUser);
router.delete("/", authenticateUser, deleteUser);
router.post("/login", loginUser);
router.get("/users", getAllUser);

export default router;
