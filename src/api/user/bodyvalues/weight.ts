import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const GetUserWeightOptionsSchema = z.object({
  date: z.union([z.date(), z.string()]).optional(),
});

type GetUserWeightOptions = z.infer<typeof GetUserWeightOptionsSchema>;

export const UserWeightSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  value: z.number().nullable(),
  external_id: z.string().nullable(),
  gateway: z.string().nullable(),
  source: z.string().nullable(),
});

export type UserWeight = z.infer<typeof UserWeightSchema>;

/**
 * Get the last weight entry of the user, optionally for a specific day.
 *
 * @param token - The token to use for authentication.
 * @param options - Optional options to customize the request.
 *
 * @returns - Promise resolving the latest weight entry of the user.
 */
export const getUserWeight = async (
  token: Token,
  options?: GetUserWeightOptions
): Promise<UserWeight | null> =>
  fetchYazio<UserWeight | null>(
    `/user/bodyvalues/weight/last?date=${parseDate(
      options?.date ?? new Date()
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
