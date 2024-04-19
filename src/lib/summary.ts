import type { ConsumedItem, UserConsumedItems } from "@/types/api/items";
import type { Token } from "@/types/auth";
import type { Daytime } from "@/types/primitives";
import type { DailySummary } from "@/types/summary";
import { parseDate } from "@/utils/date";
import { YazioApiError } from "@/utils/error";

interface GetDailySummaryOptions {
  date?: Date;
}

/**
 * Get the daily summary of consumed items.
 *
 * @param token - The token to use for authentication.
 * Retrieved through `getToken()` or `refreshToken()`.
 * @param options - Options for the request.
 *
 * @returns - Promise resolving to the daily summary.
 */
export const getDailySummary = async (
  token: Token,
  options?: GetDailySummaryOptions
): Promise<DailySummary> => {
  const date = parseDate(options?.date ?? new Date());

  const consumedItems = await fetch(
    `https://yzapi.yazio.com/v14/user/consumed-items?date=${date}`,
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

    return res.json() as Promise<UserConsumedItems>;
  });

  const summary: Map<Daytime, Array<ConsumedItem>> = new Map([
    ["breakfast", [] as Array<ConsumedItem>],
    ["lunch", [] as Array<ConsumedItem>],
    ["dinner", [] as Array<ConsumedItem>],
    ["snack", [] as Array<ConsumedItem>],
  ]);

  for (const item of consumedItems.products) {
    summary.get(item.daytime)!.push(item);
  }

  return Object.fromEntries(summary) as DailySummary;
};
