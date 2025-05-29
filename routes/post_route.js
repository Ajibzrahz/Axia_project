import express from "express"
import { createPost } from "../controllers/post_controller.js"

const postRouter = express.Router()

postRouter.post("/post", createPost)

export default postRouter