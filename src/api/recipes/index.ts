import type { Token } from "@/types/auth";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

export const RecipeNutrientsSchema = z.object({
  "energy.energy": z.number(),
  "mineral.calcium": z.number(),
  "mineral.copper": z.number(),
  "mineral.iron": z.number(),
  "mineral.magnesium": z.number(),
  "mineral.manganese": z.number(),
  "mineral.phosphorus": z.number(),
  "mineral.potassium": z.number(),
  "mineral.selenium": z.number().optional(),
  "mineral.zinc": z.number(),
  "nutrient.carb": z.number(),
  "nutrient.cholesterol": z.number(),
  "nutrient.dietaryfiber": z.number(),
  "nutrient.fat": z.number(),
  "nutrient.monounsaturated": z.number(),
  "nutrient.polyunsaturated": z.number(),
  "nutrient.protein": z.number(),
  "nutrient.salt": z.number(),
  "nutrient.saturated": z.number(),
  "nutrient.sodium": z.number(),
  "nutrient.sugar": z.number(),
  "nutrient.transfat": z.number(),
  "nutrient.water": z.number(),
  "vitamin.a": z.number(),
  "vitamin.b1": z.number(),
  "vitamin.b11": z.number(),
  "vitamin.b12": z.number(),
  "vitamin.b2": z.number(),
  "vitamin.b3": z.number(),
  "vitamin.b5": z.number(),
  "vitamin.b6": z.number(),
  "vitamin.c": z.number(),
  "vitamin.d": z.number(),
  "vitamin.e": z.number(),
  "vitamin.k": z.number(),
});

export type RecipeNutrients = z.infer<typeof RecipeNutrientsSchema>;

export const RecipeServingSchema = z.object({
  producer: z.string().nullable(),
  name: z.string(),
  amount: z.number(),
  serving: z.string().nullable(),
  serving_quantity: z.number().nullable(),
  base_unit: z.string(),
  note: z.string().nullable(),
  product_id: z.string().uuid(),
});

export type RecipeServing = z.infer<typeof RecipeServingSchema>;

export const RecipeSchema = z.object({
  id: z.string().uuid(),
  yazio_id: z.string().nullable(),
  locale: z.string(),
  name: z.string(),
  portion_count: z.number(),
  nutrients: RecipeNutrientsSchema,
  image: z.string().nullable(),
  servings: z.array(RecipeServingSchema),
  instructions: z.array(z.string()),
  is_yazio_recipe: z.boolean(),
  available_since: z.string().nullable(),
  is_pro_recipe: z.boolean(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

/**
 * Get a list of recipes.
 *
 * @param token - The token to use for authentication.
 * @param options - Optional parameters for pagination and filtering
 * @returns Promise resolving to an array of recipes
 */
export const getRecipes = async (
  token: Token,
  options: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<Recipe[]> => {
  const params = new URLSearchParams();
  if (options.limit) params.append("limit", options.limit.toString());
  if (options.offset) params.append("offset", options.offset.toString());

  return fetchYazio<Recipe[]>(`/recipes?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
};

/**
 * Get the details of a specific recipe.
 *
 * @param token - The token to use for authentication.
 * @param id - The ID of the recipe to get.
 *
 * @returns - Promise resolving to the recipe details or `null`.
 */
export const getRecipe = async (
  token: Token,
  id: string
): Promise<Recipe | null> =>
  fetchYazio<Recipe | null>(`/recipes/${id}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((recipe: Recipe | null) => (recipe ? { ...recipe, id } : null));
