import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

import { YazioAuth } from "@/lib/auth";
import { TokenSchema } from "@/types/auth";

describe("auth", () => {
  test("authenticate a new `YazioAuth` instance with credentials", async () => {
    const auth = new YazioAuth({
      credentials: {
        username: Bun.env.YAZIO_USERNAME!,
        password: Bun.env.YAZIO_PASSWORD!,
      },
    });

    const token = await auth.authenticate();

    // Validate the schema of the returned data.
    const res = TokenSchema.safeParse(token);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("authenticate a new `YazioAuth` instance with a token pair", async () => {
    const auth = new YazioAuth({
      token: await getTokenPair(),
    });

    const token = await auth.authenticate();

    // Validate the schema of the returned data.
    const res = TokenSchema.safeParse(token);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });
});
