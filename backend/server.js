import express from "express";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import env from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";
import eligibilityRoutes from "./routes/eligibilityRoutes.js";
import cors from "cors";

const app = express();
env.config();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));




app.use(express.json());
const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/eligibility", eligibilityRoutes);
app.use("/api/admin", adminRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});