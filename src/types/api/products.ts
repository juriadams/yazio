import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  is_verified: z.boolean(),
  is_private: z.boolean(),
  is_deleted: z.boolean(),
  has_ean: z.boolean(),
  category: z.string(),
  producer: z.string(),
  nutrients: z.object({
    "energy.energy": z.number(),
    "nutrient.carb": z.number(),
    "nutrient.dietaryfiber": z.number(),
    "nutrient.fat": z.number(),
    "nutrient.protein": z.number(),
    "nutrient.salt": z.number(),
    "nutrient.saturated": z.number(),
    "nutrient.sugar": z.number(),
  }),
  updated_at: z.string(),
  servings: z.array(
    z.object({
      serving: z.string(),
      amount: z.number(),
    })
  ),
  base_unit: z.string(),
  eans: z.array(z.string()),
  language: z.string(),
  countries: z.array(z.string()),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductSearchResultSchema = z.object({
  score: z.number(),
  name: z.string(),
  product_id: z.string(),
  serving: z.string(),
  serving_quantity: z.number(),
  amount: z.number(),
  base_unit: z.string(),
  producer: z.string().nullable(),
  is_verified: z.boolean(),
  nutrients: z.object({
    "energy.energy": z.number(),
    "nutrient.carb": z.number(),
    "nutrient.fat": z.number(),
    "nutrient.protein": z.number(),
  }),
  countries: z.array(z.string()),
  language: z.string(),
});

export type ProductSearchResult = z.infer<typeof ProductSearchResultSchema>;
