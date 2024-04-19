import { getConsumedItems } from "@/lib/items";
import { UserConsumedItems } from "@/types/api/items";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("items", () => {
  test("get consumed items for today", async () => {
    const token = await getTokenPair();
    const items = await getConsumedItems(token);

    // Validate the schema of the returned data.
    const res = UserConsumedItems.safeParse(items);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get consumed items for the day before", async () => {
    const token = await getTokenPair();
    const items = await getConsumedItems(token, {
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    // Validate the schema of the returned data.
    const res = UserConsumedItems.safeParse(items);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });
});
