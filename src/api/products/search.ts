import type { Token } from "@/types/auth";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const SearchProductOptionsSchema = z.object({
  query: z.string(),
  sex: z.union([z.literal("male"), z.literal("female")]).optional(),
  countries: z.array(z.string().length(2)).optional(),
  locales: z.array(z.string().length(5)).optional(),
});

type SearchProductOptions = z.infer<typeof SearchProductOptionsSchema>;

export const BasicNutrientsSchema = z.object({
  "energy.energy": z.number(),
  "nutrient.carb": z.number(),
  "nutrient.protein": z.number(),
  "nutrient.fat": z.number(),
});

export type BasicNutrients = z.infer<typeof BasicNutrientsSchema>;

export const ProductSearchResultSchema = z.object({
  score: z.number(),
  name: z.string(),
  product_id: z.string().uuid(),
  serving: z.string(),
  serving_quantity: z.number().positive(),
  amount: z.number().positive(),
  base_unit: z.string(),
  producer: z.string(),
  is_verified: z.boolean(),
  nutrients: BasicNutrientsSchema,
  countries: z.array(z.string()),
  language: z.string(),
});

export type ProductSearchResult = z.infer<typeof ProductSearchResultSchema>;

/**
 * Search for products by a query.
 *
 * @param token - The token to use for authentication.
 * @param options - Options to customize the search.
 *
 * @returns - Promise resolving to the search results.
 */
export const searchProducts = async (
  token: Token,
  options: SearchProductOptions
): Promise<Array<ProductSearchResult>> => {
  const queryParams = new URLSearchParams({
    query: options.query,
    sex: options.sex ?? "male",
    countries: (options.countries ?? ["DE", "US"]).join(","),
    locales: (options.locales ?? ["en_US", "de_US"]).join(","),
  });

  return fetchYazio<Array<ProductSearchResult>>(
    `/products/search${queryParams}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
};
