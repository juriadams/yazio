import type { Token } from "@/types/auth";
import { DaytimeSchema } from "@/types/yazio";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const GetUserConsumedItemsOptionsSchema = z.object({
  date: z.union([z.date(), z.string()]).optional(),
});

type GetUserConsumedItemsOptions = z.infer<
  typeof GetUserConsumedItemsOptionsSchema
>;

export const UserConsumedItemSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  daytime: DaytimeSchema,
  type: z.string(),
  product_id: z.string().uuid(),
  amount: z.number().positive(),
  serving: z.string().nullable(),
  serving_quantity: z.number().nullable(),
});

export type UserConsumedItem = z.infer<typeof UserConsumedItemSchema>;

/**
 * Get the consumed items of the user, optionally for a specific day.
 *
 * @param token - The token to use for authentication.
 * @param options - Optional options to customize the request.
 *
 * @returns - Promise resolving to the user consumed items.
 */
export const getUserConsumedItems = async (
  token: Token,
  options?: GetUserConsumedItemsOptions
): Promise<{
  products: Array<UserConsumedItem>;
  // TODO (@juriadams): Type recipes.
  recipe_portions: Array<unknown>;
  simple_products: Array<unknown>;
}> =>
  fetchYazio(
    `/user/consumed-items?date=${parseDate(options?.date ?? new Date())}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );

const AddUserConsumedItemsOptionsSchema = z.union([
  z.object({
    id: z.string().uuid(),
    product_id: z.string().uuid(),
    date: z.union([z.date(), z.string()]),
    daytime: DaytimeSchema,
    amount: z.null(),
    serving: z.string(),
    serving_quantity: z.number(),
  }),
  z.object({
    id: z.string().uuid(),
    product_id: z.string().uuid(),
    date: z.union([z.date(), z.string()]),
    daytime: DaytimeSchema,
    amount: z.number(),
    serving: z.null(),
    serving_quantity: z.null(),
  }),
]);

type AddUserConsumedItemsOptions = z.infer<
  typeof AddUserConsumedItemsOptionsSchema
>;

/**
 * Add a consumed item to the users diary.
 *
 * @param token - The token to use for authentication.
 * @param entry - Details about the product to add.
 *
 * @returns - Promise resolving when the item was added successfully.
 */
export const addUserConsumedItem = async (
  token: Token,
  entry: AddUserConsumedItemsOptions
): Promise<void> =>
  await fetchYazio("/user/consumed-items", {
    method: "POST",
    body: JSON.stringify({
      recipe_portions: [],
      simple_products: [],
      products: [
        {
          id: entry.id,
          product_id: entry.product_id,
          date: parseDate(entry.date ?? new Date()),
          daytime: entry.daytime,
          amount: entry.amount,
          serving: entry.serving,
          serving_quantity: entry.serving_quantity,
        },
      ],
    }),
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    },
  });

/**
 * Remove a consumed item from the users diary.
 *
 * @param token - The token to use for authentication.
 * @param entry - The ID of the consumed item to remove.
 *
 * **Warning:** The `entry` parameter is the ID of the consumed item, not the
 * ID of the product.
 *
 * @returns - Promise resolving when the item was removed successfully.
 */
export const removeUserConsumedItem = async (
  token: Token,
  entry: AddUserConsumedItemsOptions["id"]
): Promise<void> =>
  fetchYazio("/user/consumed-items", {
    method: "DELETE",
    body: JSON.stringify([entry]),
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    },
  });
