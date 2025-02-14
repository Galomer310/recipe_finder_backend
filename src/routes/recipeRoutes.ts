import express, { Request, Response } from "express";
import axios from "axios";
import { authenticateUser } from "../middleware/authMiddleware";
import Recipe from "../models/Recipe";

const router = express.Router();

/**
 * 🔹 Search for recipes using Spoonacular API
 */
router.post("/search", authenticateUser, async (req: Request, res: Response): Promise<void> => {
    const { ingredients, sensitivities, additional, additionalLimit } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        res.status(400).json({ message: "Ingredients are required." });
        return;
    }

    try {
        const response = await axios.get("https://api.spoonacular.com/recipes/complexSearch", {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                includeIngredients: ingredients.join(","),
                intolerances: sensitivities?.join(","),
                number: 30,
                addRecipeInformation: true,
                fillIngredients: additional ? true : false,
                offset: additional ? additionalLimit : 0,
            },
        });

        res.json(response.data.results.map((recipe: any) => ({
            id: recipe.id,
            title: recipe.title,
            imageUrl: recipe.image,
            sourceUrl: recipe.sourceUrl,
        })));
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ message: "Failed to fetch recipes." });
    }
});

/**
 * 🔹 Save a recipe for the logged-in user
 */
router.post("/save", authenticateUser, async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, imageUrl, sourceUrl } = req.body;
        const userId = (req as any).user.id; // Extract user ID from token

        if (!title || !imageUrl || !sourceUrl) {
            res.status(400).json({ message: "All recipe fields are required." });
            return;
        }

        const recipe = await Recipe.create({ userId, title, imageUrl, sourceUrl });
        res.status(201).json(recipe);
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).json({ message: "Failed to save recipe." });
    }
});

/**
 * 🔹 Fetch saved recipes for the logged-in user
 */
router.get("/saved", authenticateUser, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const savedRecipes = await Recipe.findAll({ where: { userId } });

        res.json(savedRecipes);
    } catch (error) {
        console.error("Error fetching saved recipes:", error);
        res.status(500).json({ message: "Failed to fetch saved recipes." });
    }
});

/**
 * 🔹 Delete a saved recipe for the logged-in user
 */
router.delete("/saved/:id", authenticateUser, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const recipeId = req.params.id;

        const recipe = await Recipe.findOne({ where: { id: recipeId, userId } });
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found." });
            return;
        }

        await recipe.destroy();
        res.json({ message: "Recipe deleted successfully." });
    } catch (error) {
        console.error("Error deleting saved recipe:", error);
        res.status(500).json({ message: "Failed to delete recipe." });
    }
});

export default router;
