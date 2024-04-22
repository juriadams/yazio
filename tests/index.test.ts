import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

import { GoalsSchema } from "@/types/goals";
import { UserDailySummarySchema, UserSchema } from "@/types/api/summary";
import { Yazio } from "@/index";
import { UserConsumedItems } from "@/types/api/items";
import { ProductSchema, ProductSearchResultSchema } from "@/types/api/products";

describe("client", () => {
  test("create a new yazio client", async () => {
    new Yazio({
      token: await getTokenPair(),
    });
  });

  test("get the settings of the authenticated user", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const settings = await yazio.getUserSettings();

    // Validate the schema of the returned data.
    const res = UserSchema.safeParse(settings);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the details of the authenticated user", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const user = await yazio.getUserDetails();

    // Validate the schema of the returned data.
    const res = UserSchema.safeParse(user);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the goals for the current day", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const goals = await yazio.getGoals();

    // Validate the schema of the returned data.
    const res = GoalsSchema.safeParse(goals);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the goals for the previous day", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const goals = await yazio.getGoals({
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    // Validate the schema of the returned data.
    const res = GoalsSchema.safeParse(goals);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the consumed items for the current day", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const items = await yazio.getConsumedItems();

    // Validate the schema of the returned data.
    const res = UserConsumedItems.safeParse(items);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the consumed items for the previous day", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const items = await yazio.getConsumedItems({
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    // Validate the schema of the returned data.
    const res = UserConsumedItems.safeParse(items);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the summary for the current day", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const summary = await yazio.getDailySummary();

    // Validate the schema of the returned data.
    const res = UserDailySummarySchema.safeParse(summary);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the summary for the previous day", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const summary = await yazio.getDailySummary({
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    // Validate the schema of the returned data.
    const res = UserDailySummarySchema.safeParse(summary);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("get the details of a specific product", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const product = await yazio.getProduct({
      id: "9e68690a-becf-11e6-9052-e0071b8a8723",
    });

    // Validate the schema of the returned data.
    const res = ProductSchema.safeParse(product);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("search for a product", async () => {
    const yazio = new Yazio({
      token: await getTokenPair(),
    });

    const products = await yazio.searchProducts({
      query: "Apfel",
    });

    // Validate the schema of the returned data.
    const res = ProductSearchResultSchema.array().safeParse(products);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);

    // Verify at least one correct search result was returned.
    expect(products.length).toBeGreaterThan(0);
    expect(products.some(({ name }) => name.includes("Apfel"))).toBe(true);
  });
});
