import express from "express";
import allEndpoints from "../endpoints/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// --- Constants ---
const PORT = 8008;

// --- App Setup ---
const app = express();

// ✅ Allow your frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

// --- Routes ---
// Health check route
app.get("/health", (req, res) => {
  console.log(req.url, "checking server health.");
  res.status(200).send("Server is UP and RUNNING");
});

// Load all API routes (e.g., /api/auth, /api/requests)
app.use("/api", allEndpoints);

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} 🚀`);
});
