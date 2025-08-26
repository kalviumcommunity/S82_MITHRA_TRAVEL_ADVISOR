import express from "express";
import { multiShotPrompt } from "../Controllers/multishotcontroller.js";

const router = express.Router();

// POST /api/ai/multishot
router.post("/multishot", multiShotPrompt);

export default router;
