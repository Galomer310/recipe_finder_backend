import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import authRoutes from "./routes/authRoutes";
import recipeRoutes from "./routes/recipeRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Sync database
sequelize.sync({ alter: true }) 
    .then(() => console.log("Database connected & synchronized!"))
    .catch((err) => console.error("Database sync error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port https://localhost${PORT}`));
