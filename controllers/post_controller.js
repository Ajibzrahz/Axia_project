import postModel from "../model/post.js";

const createPost = async(req, res) => {
    const payload = req.body
    res.json({
        "message": "Post successful",
        "post": payload
    })
}

export {createPost}