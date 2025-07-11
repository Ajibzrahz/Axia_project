import userModel from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  const payload = req.body;

  if (!payload.password || !payload.email) {
    return res.json({ message: "Fill in the required section" });
  }
  const existingUser = await userModel.findOne({
    $or: [{ email: payload.email }, { phone: payload.phone }],
  });
  if (existingUser) {
    return res.json({
      message:
        "User already exist try another email/phone or log into your account",
    });
  }
  try {
    const newUser = new userModel(payload);

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  );
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id, admin } = req.user;
  const { confirm } = req.body;
  try {
    const deleteduser = await userModel.findById(id);

    //check if user can delete account
    if (id != deleteduser.id && !admin) {
      return res.json({
        message: "You don't the authorization to delete this account",
      });
    }

    //confirming user delete
    if (!confirm) {
      res.json({
        message:
          "Are you sure you want to delete your account? Send { confirm: true } in the request body.",
      });
    }

    await userModel.findByIdAndDelete(id);
    res.clearCookie("Token");
    res
      .status(201)
      .json({ message: "Your account has been deleted successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

const singleUser = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    const userAccount = await userModel
      .findById(id)
      .populate({
        path: "posts",
        select: "title desc",
      })
      .populate({
        path: "kyc",
        select: "-backPix",
      })
      .populate({
        path: "likes",
        select: "-user",
      });
    return res.json(userAccount);
  } catch (error) {
    return res.json(error.message);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      throw new Error("This is account does not exist, create account!!!");
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      const err = new Error("Invalid Email or Password");
      err.status = 400;
      next(err);
    }
    //generating a token
    const token = jwt.sign(
      {
        id: user.id,
        kyc: user.kyc,
        admin: user.admin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2hr",
      }
    );

    res.cookie("Token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
    });
    return res.json({
      message: "login successful",
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.aggregate([
      {
        $match: {
          email: { $regex: /@gmail\.com$/ },
        },
      },
      {
        $sort: {
          name: -1,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          as: "postDetails",
        },
      },
      {
        $project: {
          password: 0,
          _id: 0,
        },
      },
    ]);
    return res.json(users);
  } catch (error) {
    res.json(error.message);
  }
};

const test = async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  res.send(req.file);
};

const testArray = async (req, res) => {
  console.log(req.files[1].originalname);
  console.log(req.body);
  res.send(req.files);
};

const testMultiple = async (req, res) => {
  console.log(req.files)
  res.send(req.files)
};

export {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  singleUser,
  getAllUser,
  test,
  testArray,
  testMultiple,
};
