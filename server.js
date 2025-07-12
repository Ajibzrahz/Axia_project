import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import router from "./routes/user_route.js";
import postRouter from "./routes/post_route.js";
import cookieParser from "cookie-parser";
import kycrouter from "./routes/kyc_routes.js";
import likesRouter from "./routes/like_routes.js";

const port = 5000;
const app = express();
// connecting to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

//content-types middlewares
app.use(express.json());
app.use(
  express.text({
    type: [
      "text/plain",
      "application/javascript",
      "text/html",
      "application/xml",
    ],
  })
);
app.use(express.urlencoded())

app.use(cookieParser());
//running the routes
app.use(router);
app.use(postRouter);
app.use(kycrouter);
app.use(likesRouter);

app.use((error, req, res, next) => {
  return res
    .status(error.status || 501)
    .json({ message: error.message || "something happened" });
});
