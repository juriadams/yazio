import type { ConsumedItem, UserConsumedItems } from "@/types/api/items";
import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { YazioApiError } from "@/utils/error";
import { z } from "zod";

export const GetConsumedItemOptionsSchema = z.object({
  date: z.date().optional(),
});

export type GetConsumedItemOptions = z.infer<
  typeof GetConsumedItemOptionsSchema
>;

/**
 * Get the consumed items for a specific day.
 *
 * @param token - Token to use for authentication.
 * @param options - Options for the request.
 *
 * @returns - Promise resolving the consumed items.
 */
export const getConsumedItems = async (
  token: Token,
  options?: GetConsumedItemOptions
): Promise<UserConsumedItems> => {
  const date = parseDate(options?.date ?? new Date());

  return fetch(`https://yzapi.yazio.com/v14/user/consumed-items?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => {
    if (!res.ok)
      throw new YazioApiError(`Error fetching consumed items.`, {
        details: `${res.status} ${res.statusText}`,
      });

    return res.json() as Promise<UserConsumedItems>;
  });
};

export const AddConsumedItemOptionsSchema = z.object({
  date: z.date().optional(),
});

export type AddConsumedItemOptions = z.infer<
  typeof AddConsumedItemOptionsSchema
>;

/**
 * Add a consumed item to the user's diary.
 *
 * @param token - Token to use for authentication.
 * @param product - Details about the item to add.
 * @param options - Options for the request.
 *
 * @returns - Promise resolving a currently unknown response.
 */
export const addConsumedItem = async (
  token: Token,
  product: ConsumedItem,
  options?: AddConsumedItemOptions
): Promise<unknown> => {
  const date = parseDate(options?.date ?? new Date());

  return fetch(`https://yzapi.yazio.com/v14/user/consumed-items?date=${date}`, {
    method: "POST",
    body: JSON.stringify({
      simple_products: [],
      recipe_portions: [],
      products: [product],
    }),
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => {
    if (!res.ok)
      throw new YazioApiError(`Error adding consumed item.`, {
        details: `${res.status} ${res.statusText}`,
      });

    return res.json() as Promise<unknown>;
  });
};
