import { getDailySummary } from "@/lib/summary";
import { UserDailySummarySchema } from "@/types/api/summary";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("summary", () => {
  test("get the daily summary for today", async () => {
    const token = await getTokenPair();
    const summary = await getDailySummary(token);

    // Validate the schema of the returned data.
    const res = UserDailySummarySchema.safeParse(summary);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the daily summary for the day before", async () => {
    const token = await getTokenPair();
    const summary = await getDailySummary(token, {
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    // Validate the schema of the returned data.
    const res = UserDailySummarySchema.safeParse(summary);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });
});
