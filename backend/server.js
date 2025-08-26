import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import zeroShotRoutes from "./Routes/zeroroutes.js";
import oneShotRoutes from "./Routes/oneshotroutes.js";
import multiShotRoutes from "./Routes/multishotroutes.js";

import chainOfThoughtRoutes from "./Routes/chainofthought.js";
import  dynamicPrompt  from "./Routes/dynamicroutes.js";

import functionCallingRoutes from './Routes/functioncallingroutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/ai", zeroShotRoutes);
app.use("/api/ai", oneShotRoutes);
app.use("/api/ai", multiShotRoutes);

app.use("/api/ai", chainOfThoughtRoutes);
app.use("/api/ai", dynamicPrompt);
app.use("/api/ai", functionCallingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
