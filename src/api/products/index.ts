import type { Token } from "@/types/auth";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

export const NutrientsSchema = z.object({
  "energy.energy": z.number(),
  "mineral.calcium": z.number(),
  "mineral.chlorine": z.number(),
  "mineral.copper": z.number(),
  "mineral.fluorine": z.number(),
  "mineral.iron": z.number(),
  "mineral.magnesium": z.number(),
  "mineral.manganese": z.number(),
  "mineral.phosphorus": z.number(),
  "mineral.potassium": z.number(),
  "mineral.sulfur": z.number(),
  "mineral.zinc": z.number(),
  "nutrient.carb": z.number(),
  "nutrient.dietaryfiber": z.number(),
  "nutrient.fat": z.number(),
  "nutrient.protein": z.number(),
  "nutrient.sugar": z.number(),
  "vitamin.a": z.number(),
  "vitamin.b1": z.number(),
  "vitamin.b12": z.number(),
  "vitamin.b2": z.number(),
  "vitamin.b6": z.number(),
  "vitamin.d": z.number(),
  "vitamin.e": z.number(),
});

export type Nutrients = z.infer<typeof NutrientsSchema>;

export const ServingSchema = z.object({
  serving: z.string(),
  amount: z.number().positive(),
});

export type Serving = z.infer<typeof ServingSchema>;

export const ProductSchema = z.object({
  name: z.string(),
  is_verified: z.boolean(),
  is_private: z.boolean(),
  is_deleted: z.boolean(),
  has_ean: z.boolean(),
  category: z.string(),
  producer: z.string().nullable(),
  nutrients: NutrientsSchema,
  updated_at: z.string(),
  servings: z.array(ServingSchema),
  base_unit: z.string(),
  eans: z.array(z.string()),
  language: z.string(),
  countries: z.array(z.string()),
});

export type Product = z.infer<typeof ProductSchema>;

/**
 * Get the details of a specific product.
 *
 * @param token - The token to use for authentication.
 * @param id - The ID of the product to get.
 *
 * @returns - Promise resolving to the product details or `null`.
 */
export const getProduct = async (
  token: Token,
  id: string
): Promise<Product | null> =>
  fetchYazio<Product | null>(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((product) => (product ? { ...product, id } : null));
