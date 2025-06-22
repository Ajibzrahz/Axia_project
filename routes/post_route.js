import express from "express";
import {
  createPost,
  deletePost,
  getSinglePost,
  getUserPosts,
} from "../controllers/post_controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const postRouter = express.Router();

postRouter.post("/post", authenticateUser, createPost);
postRouter.delete("/post", deletePost);
postRouter.get("/post/:creator_id", getUserPosts);
postRouter.get("/post", getSinglePost);

export default postRouter;
