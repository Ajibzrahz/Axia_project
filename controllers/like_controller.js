import likeModel from "../model/like.js";
import postModel from "../model/post.js";
import userModel from "../model/user.js";

const userLikes = async (req, res) => {
 
};

const likepost = async (req, res) => {
  const { id } = req.user;
  const { postId } = req.query;

  if (!id) {
    return res.json({
      message: "You cannot like a post, login or create account",
    });
  }
  try {
    const alreadyLiked = await likeModel.findOne({ user: id, post: postId });
    if (alreadyLiked) {
      return res.json({
        message: "cannot like more than once",
      });
    }

    const newLike = new likeModel({ user: id, post: postId });
    const liked = await newLike.save();

    const userInfo = await userModel.findById(id);
    userInfo.likes.push(liked._id);
    await userInfo.save();

    // const postInfo = await postModel.findById(postId);
    // postInfo.likes.push(liked._id);
    // await postInfo.save();

    res.send("Post Liked");
  } catch (error) {
    res.json(error.message);
  }
};
export { userLikes, likepost };
