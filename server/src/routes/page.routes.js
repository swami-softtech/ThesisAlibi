import express from "express";
import {
  createOrUpdatePage,
  deletePage,
  getAllPages,
  getPageByType,
} from "../controllers/page.controller.js";

const router = express.Router();

router.post("/", createOrUpdatePage);     // Create / Update
router.get("/", getAllPages);              // Get all pages
router.get("/:type", getPageByType);       // Get single page by type
router.delete("/:type", deletePage);       // Delete page

export default router;
