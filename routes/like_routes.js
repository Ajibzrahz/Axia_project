import { likepost, userLikes } from "../controllers/like_controller.js";
import e from "express";
import authenticateUser from "../middlewares/auth.middleware.js";

const likesRouter = e.Router();

likesRouter.get("/likes", userLikes);
likesRouter.post("/likes", authenticateUser, likepost);

export default likesRouter;
