import likeModel from "../model/like.js";
import userModel from "../model/user.js";

const userLikes = (req, res) => {};

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
    const Updated = await userModel.findByIdAndUpdate(
      id,
      { $push: { likes: liked._id } },
      { new: true }
    );
    console.log(Updated);

    res.send("Post Liked")
  } catch (error) {
    res.json(error.message);
  }
};
export { userLikes, likepost };
