import e from "express";
import authenticateUser from "../middlewares/auth.middleware.js";

const kycrouter = e.Router();

kycrouter.post("/kyc", authenticateUser, createKyc);

export default kycrouter;
