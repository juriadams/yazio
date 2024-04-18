import { getDailySummary } from "@/lib/summary";
import { DailySummarySchema } from "@/types/summary";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("summary", () => {
  test("get daily summary", async () => {
    const token = await getTokenPair();
    const summary = await getDailySummary(token);

    // Validate the schema of the returned data.
    const res = DailySummarySchema.safeParse(summary);

    expect(res.success).toBe(true);
  });
});
