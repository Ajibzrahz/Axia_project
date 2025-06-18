import postModel from "../model/post.js";
import jwt from "jsonwebtoken"

const createPost = async(req, res) => {
    const post = req.body
    const {id} = req.user
    console.log(req.user)
    
    try {
        const newPost = new postModel({
            creator: id,
            ...post})
        const savedPost = await newPost.save()
        res.send(savedPost)


    } catch (error) {
        res.send(error.message)
    }
}

const deletePost = async (req, res) => {
    const {post_id} = req.query
    const { id, admin } = req.user
try {
    const post = await postModel.findById(post_id)
    if (!post) {
        return res.json({
            message: "post does not exist, create Post"
        })
    }
    //checking if user can delete post
    if (id != post.creator && !admin) {
        return res.json({
            message: "You cannot delete this Post"
        })
    } else{
        await postModel.findByIdAndDelete(post_id)
        return res.send("Post deleted successfully")
    }

} catch (error) {
    res.send(error.message)
}
    

}
const getUserPosts = async (req, res) => {
    const {creator_id} = req.params
    try {
    const posts =  await postModel.find({creator:creator_id})
        return res.send(posts)
    } catch (error) {
        return res.send(error.message)
    }
}

const getSinglePost = async (req, res) => {
    const { post_id } = req.query
    try {
        const singlePost = await postModel.findById(post_id)
        if (!singlePost) {
            return res.json({
                message: "post does not exist"
            })
        }
        return res.send(singlePost)
    } catch (error) {
        return res.send(error.message)
    }
}

export {createPost, deletePost, getUserPosts, getSinglePost }