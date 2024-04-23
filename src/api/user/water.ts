import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const GetUserWaterIntakeOptionsSchema = z.object({
  date: z.date().optional(),
});

type GetUserWaterIntakeOptions = z.infer<
  typeof GetUserWaterIntakeOptionsSchema
>;

export const UserWaterIntakeSchema = z.object({
  water_intake: z.number(),
  gateway: z.string().nullable(),
  source: z.string().nullable(),
});

export type UserWaterIntake = z.infer<typeof UserWaterIntakeSchema>;

/**
 * Get the water intake of the user, optionally for a specific day.
 *
 * @param token - The token to use for authentication.
 * @param options - Optional options to customize the request.
 *
 * @returns - Promise resolving to the user water intake.
 */
export const getUserWaterIntake = async (
  token: Token,
  options?: GetUserWaterIntakeOptions
): Promise<UserWaterIntake> =>
  fetchYazio<UserWaterIntake>(
    `/user/water-intake?date=${parseDate(options?.date ?? new Date())}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
