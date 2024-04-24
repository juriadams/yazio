import { describe, test } from "bun:test";

import { Yazio } from "@/index";

describe("user", () => {
  describe("consumed items", () => {
    test("add a specific amount to the diary", async () => {
      const yazio = new Yazio({
        credentials: {
          username: Bun.env.YAZIO_USERNAME!,
          password: Bun.env.YAZIO_PASSWORD!,
        },
      });

      await yazio.user.addConsumedItem({
        id: crypto.randomUUID(),
        product_id: "9e219ae8-becf-11e6-b9dc-e0071b8a8723",
        date: new Date(),
        daytime: "breakfast",
        amount: 100,
        serving: null,
        serving_quantity: null,
      });
    });

    test("add a serving to the diary", async () => {
      const yazio = new Yazio({
        credentials: {
          username: Bun.env.YAZIO_USERNAME!,
          password: Bun.env.YAZIO_PASSWORD!,
        },
      });

      await yazio.user.addConsumedItem({
        id: crypto.randomUUID(),
        product_id: "9e219ae8-becf-11e6-b9dc-e0071b8a8723",
        date: new Date(),
        daytime: "breakfast",
        amount: 80,
        serving: "roll",
        serving_quantity: 1,
      });
    });

    test("add multiple servings to the diary", async () => {
      const yazio = new Yazio({
        credentials: {
          username: Bun.env.YAZIO_USERNAME!,
          password: Bun.env.YAZIO_PASSWORD!,
        },
      });

      await yazio.user.addConsumedItem({
        id: crypto.randomUUID(),
        product_id: "9e219ae8-becf-11e6-b9dc-e0071b8a8723",
        date: new Date(),
        daytime: "breakfast",
        amount: 160,
        serving: "roll",
        serving_quantity: 2,
      });
    });
  });
});
