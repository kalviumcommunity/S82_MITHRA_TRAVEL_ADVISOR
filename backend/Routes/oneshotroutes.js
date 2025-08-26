import express from "express";
import { oneShotPrompt } from "../Controllers/oneshotcontroller.js";

const router = express.Router();

// POST /api/ai/oneshot
router.post("/oneshot", oneShotPrompt);

export default router;
