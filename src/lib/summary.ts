import type { UserDailySummary } from "@/types/api/summary";
import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { YazioApiError } from "@/utils/error";

import { z } from "zod";

export const GetDailySummaryOptionsSchema = z.object({
  date: z.date().optional(),
});

export type GetDailySummaryOptions = z.infer<
  typeof GetDailySummaryOptionsSchema
>;

/**
 * Get the daily summary for a specific day.
 *
 * @param token - Token to use for authentication.
 * @param options - Options for the request.
 *
 * @returns - Promise resolving the daily summary.
 */
export const getDailySummary = async (
  token: Token,
  options?: GetDailySummaryOptions
): Promise<UserDailySummary> => {
  const date = parseDate(options?.date ?? new Date());

  return fetch(
    `https://yzapi.yazio.com/v14/user/widgets/daily-summary?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  ).then((res) => {
    if (!res.ok)
      throw new YazioApiError(`Error fetching daily summary.`, {
        details: `${res.status} ${res.statusText}`,
      });

    return res.json() as Promise<UserDailySummary>;
  });
};
