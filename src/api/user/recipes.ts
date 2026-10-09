import type { Token } from "@/types/auth";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

export const RecipeServingSchema = z.object({
  producer: z.string().nullable(),
  name: z.string(),
  amount: z.number(),
  base_unit: z.string(),
  serving: z.string().nullable(),
  serving_quantity: z.number().nullable(),
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
  nutrients: z.record(z.string(), z.number()),
  image: z.string().nullable(),
  instructions: z.array(z.string()),
  is_yazio_recipe: z.boolean(),
  available_since: z.string().nullable(),
  is_pro_recipe: z.boolean(),
  servings: z.array(RecipeServingSchema),
});

export type Recipe = z.infer<typeof RecipeSchema>;

/**
 * Get the list of recipe IDs belonging to the user (no details).
 * Use getRecipe(id) for each id to fetch full recipe data.
 *
 * @param token - The token to use for authentication.
 *
 * @returns - Promise resolving to an array of recipe UUIDs.
 */
export const getUserRecipeIds = async (
  token: Token
): Promise<string[]> =>
  fetchYazio<string[]>(`/user/recipes`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      Accept: "application/json",
    },
  });

/**
 * Get a recipe by id.
 *
 * @param token - The token to use for authentication.
 * @param recipeId - The UUID of the recipe.
 *
 * @returns - Promise resolving to the recipe.
 */
export const getRecipe = async (
  token: Token,
  recipeId: string
): Promise<Recipe> =>
  fetchYazio<Recipe>(`/recipes/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      Accept: "application/json",
    },
  });

/**
 * Delete a user recipe by id.
 *
 * @param token - The token to use for authentication.
 * @param recipeId - The UUID of the recipe to delete.
 *
 * @returns - Promise resolving when the recipe was deleted (204).
 */
export const deleteUserRecipe = async (
  token: Token,
  recipeId: string
): Promise<void> =>
  fetchYazio<void>(`/user/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
