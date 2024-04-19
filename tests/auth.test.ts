import { refreshTokenPair } from "@/lib/auth";
import { TokenSchema } from "@/types/auth";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("auth", () => {
  test("get token from credentials", async () => {
    const token = await getTokenPair();

    // Validate the schema of the returned data.
    const res = TokenSchema.safeParse(token);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("refresh previously expired token", async () => {
    const token = await getTokenPair();
    const freshToken = await refreshTokenPair(token);

    // Validate the schema of the returned data.
    const res = TokenSchema.safeParse(freshToken);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });
});
