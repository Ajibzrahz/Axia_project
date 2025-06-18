import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,   
        },
        desc: {
            type: String,
            required: true
        },
        reviewPic: {
            type: String,
            required: true
        },
        creator: {
            type: mongoose.Types.ObjectId,
            required: true
        } 
    },
    {timestamps: true}
)

const postModel = mongoose.model("Post", postSchema)
export default postModel 
