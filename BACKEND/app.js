import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"



const app=express();

//Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",   // your Vite frontend URL
    credentials: true,                  // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Routes
app.use("/api/auth",authRoutes);



app.get("/",(req,res)=> {
    res.send("API Running...");
});

export default app;