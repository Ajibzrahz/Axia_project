import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user:
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const likeModel = mongoose.model("Like", likeSchema);
export default likeModel;
