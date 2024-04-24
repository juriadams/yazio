import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const GetUserGoalsOptionsSchema = z.object({
  date: z.union([z.date(), z.string()]).optional(),
});

type GetUserGoalsOptions = z.infer<typeof GetUserGoalsOptionsSchema>;

const UserGoalsSchema = z.object({
  "energy.energy": z.number(),
  "nutrient.protein": z.number(),
  "nutrient.fat": z.number(),
  "nutrient.carb": z.number(),
  "activity.step": z.number(),
  "bodyvalue.weight": z.number(),
  water: z.number(),
});

export type UserGoals = z.infer<typeof UserGoalsSchema>;

/**
 * Get the goals of the user, optionally for a specific day.
 *
 * @param token - The token to use for authentication.
 * @param options - Optional options to customize the request.
 *
 * @returns - Promise resolving to the user goals.
 */
export const getUserGoals = async (
  token: Token,
  options?: GetUserGoalsOptions
): Promise<UserGoals> =>
  fetchYazio<UserGoals>(
    `/user/goals/unmodified?date=${parseDate(options?.date ?? new Date())}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
