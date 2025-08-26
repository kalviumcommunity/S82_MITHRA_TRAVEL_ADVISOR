import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import oneShotRoutes from "./Routes/oneshotroutes.js";
import zeroroutes from "./Routes/zeroroutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/ai", oneShotRoutes);
app.use("/api/ai", zeroroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
