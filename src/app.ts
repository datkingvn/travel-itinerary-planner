import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// User route integration
app.use("/api/users", userRoutes);

// Connect to DB
connectDB();

// Route check server
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Travel Itinerary Planner API!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
