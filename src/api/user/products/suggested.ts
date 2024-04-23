import { DaytimeSchema } from "@/types/yazio";
import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const GetUserSuggestedProductsOptionsSchema = z.object({
  date: z.date().optional(),
  daytime: DaytimeSchema,
});

type GetUserSuggestedProductsOptions = z.infer<
  typeof GetUserSuggestedProductsOptionsSchema
>;

export const UserSuggestedProductSchema = z.object({
  product_id: z.string().uuid(),
  amount: z.number().positive(),
  serving: z.string().nullable(),
  serving_quantity: z.number().nullable(),
});

export type UserSuggestedProduct = z.infer<typeof UserSuggestedProductSchema>;

/**
 * Get the suggested products for a user for a specific daytime, optionally
 * for a specific day.
 *
 * @param token - Token to use for authentication.
 * @param options - Options for the request.
 */
export const getUserSuggestedProducts = async (
  token: Token,
  options: GetUserSuggestedProductsOptions
): Promise<Array<UserSuggestedProduct>> =>
  fetchYazio<Array<UserSuggestedProduct>>(
    `/user/products/suggested?date=${parseDate(
      options.date ?? new Date()
    )}&daytime=${options.daytime}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
