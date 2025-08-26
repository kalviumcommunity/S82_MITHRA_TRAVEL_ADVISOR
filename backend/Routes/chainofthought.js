import express from "express";
import { chainOfThoughtPrompt } from "../Controllers/chainofthoughtcontroller.js";

const router = express.Router();

// POST /api/ai/chainofthought
router.post("/chainofthought", chainOfThoughtPrompt);

export default router;
