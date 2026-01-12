import express from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  createProfile,
  getProfileById,
  getAllUsers
} from "../controllers/user.controller.js";

const router = express.Router();

// user management
router.get("/users", getAllUsers);

// single profile
router.post("/profile", createProfile);
router.get("/profile", getProfile); // ?email=
router.get("/profile/:id", getProfileById);
router.put("/profile", updateProfile);
router.delete("/profile", deleteProfile);

export default router;
