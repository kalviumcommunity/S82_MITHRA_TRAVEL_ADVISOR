import express from "express";
import { tokensAndTokenization } from "../Controllers/tokencontroller.js";

const router = express.Router();

// POST /api/tokenize
router.post("/tokenize", tokensAndTokenization);

export default router;
