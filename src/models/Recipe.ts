import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Recipe extends Model {
    public id!: number;
    public userId!: number;
    public title!: string;
    public imageUrl!: string;
    public sourceUrl!: string;
}

Recipe.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            field: "userId" // Enforces exact column name
        },
        title: { type: DataTypes.STRING, allowNull: false },
        imageUrl: { type: DataTypes.STRING, allowNull: false },
        sourceUrl: { type: DataTypes.STRING, allowNull: false },
    },
    { 
        sequelize, 
        modelName: "recipe",
        tableName: "Recipes", // Ensures case-sensitive table naming
        underscored: false // Prevents converting camelCase to snake_case
    }
);

export default Recipe;
