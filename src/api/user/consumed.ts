import type { Token } from "@/types/auth";
import { DaytimeSchema } from "@/types/yazio";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const GetUserConsumedItemsOptionsSchema = z.object({
  date: z.date().optional(),
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
  amount: z.number().nullable(),
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
