import kycModel from "../model/kyc";
import userModel from "../model/user";

const createKyc = async (req, res) => {
  const payload = req.body;
  const { id } = req.user;

  try {
    //verifying kyc existing before
    const kycExist = kycModel.findOne({ user: id });
    if (kycExist) {
      return res.json({ message: "User has already completed KYC" });
    }
    //creating Kyc
    const KYC = new kycModel({ user: id, ...payload });
    const savedKyc = await KYC.save();

    //updating the user account
    await userModel.findByIdAndUpdate(id, { kyc: savedKyc }, { new: true });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export { createKyc };
