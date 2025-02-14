import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in .env file.");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Required for NeonDB
        },
    },
    logging: false,
});

export default sequelize;
