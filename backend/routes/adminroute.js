import express from "express";
import { addDoctor, adminLogin } from "../controllers/admincontroller.js";
import upload, { handleMulterError } from "../middleware/multer.js";
import authAdmin from "../middleware/authadmin.js";

const adminrouter = express.Router();

adminrouter.post("/add-doctor", authAdmin, upload.single("image"), handleMulterError, addDoctor);
adminrouter.post("/admin-login", adminLogin);

export default adminrouter;
