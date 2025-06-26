import e from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import { createKyc, getOneKyc } from "../controllers/kyc_controller.js";

const kycrouter = e.Router();

kycrouter.post("/kyc", authenticateUser, createKyc);
kycrouter.get("/kyc", authenticateUser, getOneKyc);

export default kycrouter;
