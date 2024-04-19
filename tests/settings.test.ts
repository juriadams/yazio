import { getSettings } from "@/lib/settings";
import { UserSettingsSchema } from "@/types/api/settings";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("settings", () => {
  test("get the user settings", async () => {
    const token = await getTokenPair();
    const settings = await getSettings(token);

    // Validate the schema of the returned data.
    const res = UserSettingsSchema.safeParse(settings);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });
});
