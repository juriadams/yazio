import type { Product, ProductSearchResult } from "@/types/api/products";
import type { Token } from "@/types/auth";
import { YazioApiError } from "@/utils/error";
import { z } from "zod";

export const GetProductOptionsSchema = z.object({
  id: z.string().uuid(),
});

export type GetProductOptions = z.infer<typeof GetProductOptionsSchema>;

/**
 * Get details about a specific product.
 *
 * @param token - Token to use for authentication.
 * @param opts - Object containing the ID of the product to fetch.
 *
 * @returns - Promise resolving the product details.
 */
export const getProduct = async (
  token: Token,
  options: GetProductOptions
): Promise<Product> =>
  fetch(`https://yzapi.yazio.com/v14/products/${options.id}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => {
    if (!res.ok)
      throw new YazioApiError(`Error fetching product details.`, {
        details: `${res.status} ${res.statusText}`,
      });

    return res.json() as Promise<Product>;
  });

export const SearchProductOptionsSchema = z.object({
  query: z.string(),
  sex: z.union([z.literal("male"), z.literal("female")]).optional(),
  countries: z.string().optional(),
  locales: z.string().optional(),
});

export type SearchProductOptions = z.infer<typeof SearchProductOptionsSchema>;

/**
 * Perform a search for products.
 *
 * @param token - Token to use for authentication.
 * @param options - Object containing the search query and optional filters.
 *
 * @returns - Promise resolving the search results.
 */
export const searchProducts = async (
  token: Token,
  options: SearchProductOptions
): Promise<ProductSearchResult[]> => {
  const { query, sex, countries, locales } = options;

  const params = new URLSearchParams({
    query,
    sex: sex || "male",
    countries: countries || "DE,US",
    locales: locales || "en_US,de_DE",
  }).toString();

  return fetch(`https://yzapi.yazio.com/v14/products/search?${params}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => {
    if (!res.ok)
      throw new YazioApiError(`Error searching for products.`, {
        details: `${res.status} ${res.statusText}`,
      });

    return res.json() as Promise<ProductSearchResult[]>;
  });
};
