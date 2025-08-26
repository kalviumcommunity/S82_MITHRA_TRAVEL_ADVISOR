import express from "express";
import { dynamicPrompt } from "../Controllers/dynamiccontroller.js";

const router = express.Router();

// POST /api/ai/dynamic
router.post("/dynamic", dynamicPrompt);

export default router;
