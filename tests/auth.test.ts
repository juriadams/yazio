import { describe, test, expect } from "bun:test";

import { YazioAuth } from "@/lib/auth";
import { TokenSchema, type Token } from "@/types/auth";

describe("auth", () => {
  describe("credentials", () => {
    test("directly passing credentials", async () => {
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

    test("passing credentials through a function", async () => {
      const auth = new YazioAuth({
        credentials: () => ({
          username: Bun.env.YAZIO_USERNAME!,
          password: Bun.env.YAZIO_PASSWORD!,
        }),
      });

      const token = await auth.authenticate();

      // Validate the schema of the returned data.
      const res = TokenSchema.safeParse(token);
      if (!res.success) console.error(res.error);

      expect(res.success).toBe(true);
    });

    test("resolving credentials through a promise", async () => {
      const auth = new YazioAuth({
        credentials: async () => ({
          username: Bun.env.YAZIO_USERNAME!,
          password: Bun.env.YAZIO_PASSWORD!,
        }),
      });

      const token = await auth.authenticate();

      // Validate the schema of the returned data.
      const res = TokenSchema.safeParse(token);
      if (!res.success) console.error(res.error);

      expect(res.success).toBe(true);
    });

    test("authenticate with a custom `onRefresh` callback set", async () => {
      let refreshedToken: Token | null = null;

      const auth = new YazioAuth({
        credentials: {
          username: Bun.env.YAZIO_USERNAME!,
          password: Bun.env.YAZIO_PASSWORD!,
        },
        onRefresh: async ({ token }) => (refreshedToken = token),
      });

      const token = await auth.authenticate();

      // Validate the schema of the returned data.
      const res = TokenSchema.safeParse(token);
      if (!res.success) console.error(res.error);

      expect(res.success).toBe(true);

      // Validate the schema of the refreshed token.
      const refreshedRes = TokenSchema.safeParse(refreshedToken!);
      if (!refreshedRes.success) console.error(refreshedRes.error);

      expect(refreshedRes.success).toBe(true);
    });
  });

  describe("token", () => {
    test("directly passing a token", async () => {
      const auth = new YazioAuth({
        token: {
          access_token: "test",
          refresh_token: "test",
          expires_in: 3600,
          expires_at: Date.now() + 3600 * 1000,
          token_type: "Bearer",
        },
      });

      const token = await auth.authenticate();

      // Validate the schema of the returned data.
      const res = TokenSchema.safeParse(token);
      if (!res.success) console.error(res.error);

      expect(res.success).toBe(true);
    });

    test("passing a token through a function", async () => {
      const auth = new YazioAuth({
        token: () => ({
          access_token: "test",
          refresh_token: "test",
          expires_in: 3600,
          expires_at: Date.now() + 3600 * 1000,
          token_type: "Bearer",
        }),
      });

      const token = await auth.authenticate();

      // Validate the schema of the returned data.
      const res = TokenSchema.safeParse(token);
      if (!res.success) console.error(res.error);

      expect(res.success).toBe(true);
    });

    test("resolving a token through a promise", async () => {
      const auth = new YazioAuth({
        token: async () => ({
          access_token: "test",
          refresh_token: "test",
          expires_in: 3600,
          expires_at: Date.now() + 3600 * 1000,
          token_type: "Bearer",
        }),
      });

      const token = await auth.authenticate();

      // Validate the schema of the returned data.
      const res = TokenSchema.safeParse(token);
      if (!res.success) console.error(res.error);

      expect(res.success).toBe(true);
    });
  });
});
