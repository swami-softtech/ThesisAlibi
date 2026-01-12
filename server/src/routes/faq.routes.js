import express from 'express';
import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq } from '../controllers/faq.controller.js';
const router = express.Router();

router.post("/", createFaq);          // CREATE
router.get("/", getAllFaqs);           // READ ALL
router.get("/:id", getFaqById);        // READ ONE
router.put("/:id", updateFaq);         // UPDATE
router.delete("/:id", deleteFaq);

export default router;