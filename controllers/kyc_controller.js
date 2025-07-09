import kycModel from "../model/kyc.js";
import userModel from "../model/user.js";

const createKyc = async (req, res) => {
  const payload = req.body;
  const { id } = req.user;

  try {
    //verifying kyc existing before
    const kycExist = await kycModel.findOne({ user: id });
    if (kycExist) {
      return res.json({ message: "User has already completed KYC" });
    }
    //creating Kyc
    const KYC = new kycModel({ user: id, ...payload });
    const savedKyc = await KYC.save();

    //updating the user account
    await userModel.findByIdAndUpdate(id, { kyc: savedKyc }, { new: true });
    return res.json({
      message: "KYC submitted successfully",
      kyc: savedKyc,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const getOneKyc = async (req, res) => {
  const { kyc } = req.user;
  try {
    const userKyc = await kycModel.findById(kyc).populate("user");
    res.json(userKyc);
  } catch (error) {
    res.json(error.message);
  }
};

export { createKyc, getOneKyc };
