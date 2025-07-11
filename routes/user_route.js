import express from "express";
import multer from "multer";
import {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  singleUser,
  getAllUser,
  test,
  testArray,
  testMultiple,
} from "../controllers/user_controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer();

const allFields = [
  { name: "dp", maxCount: 2 },
  { name: "gallery", maxCount: 2 },
];

router.post("/", createUser);
router.get("/", authenticateUser, singleUser);
router.put("/", authenticateUser, updateUser);
router.delete("/", authenticateUser, deleteUser);
router.post("/login", loginUser);
router.get("/users", getAllUser);
router.post("/test", upload.single("dp"), test);
router.post("/array", upload.array("dp", 3), testArray);
router.post("/multiple", upload.fields(allFields), testMultiple);

export default router;
