import postModel from "../model/post.js";
import jwt from "jsonwebtoken";
import userModel from "../model/user.js";

const createPost = async (req, res) => {
  const post = req.body;
  const { id } = req.user;

  try {
    const newPost = new postModel({
      creator: id,
      ...post,
    });
    const savedPost = await newPost.save();
    //we can add the new post to the posts array in 3 ways
    //1.
    /*
        const userInfo = await userModel.findById(id)
        userInfo.posts.push(savedPost.id)
       await userInfo.save()
       //2.
       */
    /*
        const allPostsId = userInfo.posts
        allPostsId.push(savedPost.id)
        await userModel.findByIdAndUpdate(id, {post:allPostsId}, {new:true})
        */
    //3.
    const Updated = await userModel.findByIdAndUpdate(
      id,
      { $push: { posts: savedPost._id } },
      { new: true }
    );
    console.log(Updated);

    res.send("Post Updated Successfully");
  } catch (error) {
    res.send(error.message);
  }
};

const deletePost = async (req, res) => {
  const { post_id } = req.query;
  const { id, admin } = req.user;
  try {
    const post = await postModel.findById(post_id);
    if (!post) {
      return res.json({
        message: "post does not exist, create Post",
      });
    }
    //checking if user can delete post
    if (id != post.creator && !admin) {
      return res.json({
        message: "You cannot delete this Post",
      });
    } else {
      await postModel.findByIdAndDelete(post_id);
      return res.send("Post deleted successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
};
const getUserPosts = async (req, res) => {
  const { id } = req.user;
  try {
    const posts = await postModel.find({ creator: id });
    return res.send(posts);
  } catch (error) {
    return res.send(error.message);
  }
};

const getSinglePost = async (req, res) => {
  const { post_id } = req.query;
  try {
    const singlePost = await postModel.findById(post_id);
    if (!singlePost) {
      return res.json({
        message: "post does not exist",
      });
    }
    return res.send(singlePost);
  } catch (error) {
    return res.send(error.message);
  }
};

export { createPost, deletePost, getUserPosts, getSinglePost };
