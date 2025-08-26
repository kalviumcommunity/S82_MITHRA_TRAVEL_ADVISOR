import express from "express";
import { zeroShotPrompt } from "../Controllers/zeroController.js";

const router = express.Router();

// POST /api/ai/generate
router.post("/generate", zeroShotPrompt);

export default router;
