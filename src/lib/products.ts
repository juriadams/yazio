import type { Product, ProductSearchResult } from "@/types/api/products";
import type { Token } from "@/types/auth";
import { YazioApiError } from "@/utils/error";

/**
 * Get details about a specific product.
 *
 * @param token - Token to use for authentication.
 * @param id - ID of the product to fetch.
 *
 * @returns - Promise resolving the product details.
 */
export const getProduct = async (token: Token, id: string): Promise<Product> =>
  fetch(`https://yzapi.yazio.com/v14/products/${id}`, {
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

interface SearchProductsOptions {
  sex: "male" | "female";
  countries: string;
  locales: string;
}

/**
 * Perform a search for products.
 *
 * @param token - Token to use for authentication.
 * @param query - Query to search for.
 * @param options - Options for the search such as custom demographics.
 *
 * @returns - Promise resolving the search results.
 */
export const searchProducts = async (
  token: Token,
  query: string,
  options?: SearchProductsOptions
): Promise<ProductSearchResult[]> => {
  const params = new URLSearchParams({
    query,
    sex: options?.sex || "male",
    countries: options?.countries || "DE,US",
    locales: options?.locales || "en_US,de_DE",
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
