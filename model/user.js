import mongoose from "mongoose";
import { hashed } from "../middlewares/document_middleware.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      reduired: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      maxlength: 11,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    kyc: {
      type: mongoose.Types.ObjectId,
      ref: "Kyc",
      unique: true,
      sparse: true,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  { timestamps: true }
);

//mongoose middleware
userSchema.pre("save", hashed);

const userModel = mongoose.model("User", userSchema);

export default userModel;
