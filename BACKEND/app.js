import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";

// ── Middleware ──
import { notFound, globalErrorHandler } from "./middleware/errorMiddleware.js";
import { handleMulterError } from "./middleware/uploadMiddleware.js";

// ── Routes ──
import sellerProductRoutes from "./routes/sellerProductRoutes.js";
import customerProductRoutes from "./routes/customerProductRoutes.js";

dotenv.config();

const app = express();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLOBAL MIDDLEWARE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Ensure uploads directory exists ──
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads", { recursive: true });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROUTES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/seller/products", sellerProductRoutes);
app.use("/api/products", customerProductRoutes);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ERROR HANDLING (order matters!)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.use(handleMulterError);   // ← catches Multer-specific errors
app.use(notFound);            // ← catches undefined routes
app.use(globalErrorHandler);  // ← catches everything else


app.get("/",(req,res)=> {
    res.send("API Running...");
});

export default app;