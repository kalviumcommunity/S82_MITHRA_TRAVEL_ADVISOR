import express from "express";
import { functionCallingPrompt } from "../Controllers/functionCallingController.js";

const router = express.Router();

// POST /api/ai/functioncall
router.post("/functioncall", functionCallingPrompt);

export default router;
