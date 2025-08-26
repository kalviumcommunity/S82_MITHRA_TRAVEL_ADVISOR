import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import zeroRoutes from "./Routes/zeroroutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/ai", zeroRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
