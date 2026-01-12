// routes/aboutSection.routes.js
import express from "express";
import {
    createAboutSection,
    getAllAboutSections,
    getAboutSectionById,
    updateAboutSection,
    deleteAboutSection,
} from "../controllers/about.controller.js";

const router = express.Router();

router.post("/", createAboutSection);
router.get("/", getAllAboutSections);
router.get("/:id", getAboutSectionById);
router.put("/:id", updateAboutSection);
router.delete("/:id", deleteAboutSection);

export default router;
