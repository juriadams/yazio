import { getGoals } from "@/lib/goals";
import { GoalsSchema } from "@/types/goals";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("goals", () => {
  test("get todays goals", async () => {
    const token = await getTokenPair();
    const goals = await getGoals(token);

    // Validate the schema of the returned data.
    const res = GoalsSchema.safeParse(goals);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the goals of the day before", async () => {
    const token = await getTokenPair();
    const goals = await getGoals(token, {
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    // Validate the schema of the returned data.
    const res = GoalsSchema.safeParse(goals);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });
});
