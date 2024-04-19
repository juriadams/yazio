import { getUser } from "@/lib/user";
import { UserSchema } from "@/types/api/user";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("user", () => {
  test("get the user details", async () => {
    const token = await getTokenPair();
    const user = await getUser(token);

    // Validate the schema of the returned data.
    const res = UserSchema.safeParse(user);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });
});
