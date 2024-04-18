import { describe, test, expect } from "bun:test";
import { getTokenPairInTests } from "tests/utils/auth";

describe("auth", () => {
  test("get token from credentials", async () => {
    const token = await getTokenPairInTests({
      username: Bun.env.YAZIO_TEST_USERNAME!,
      password: Bun.env.YAZIO_TEST_PASSWORD!,
    });

    expect(token);
  });
});
