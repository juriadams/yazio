import { getTokenPair as packageGetTokenPair } from "@/lib/auth";
import type { Token } from "@/types/auth";
import { resolve } from "node:path";

const ENV_PATH = resolve(import.meta.path, "../../../.env");

/**
 * Gets a token pair either from a previous test run or by requesting a new one.
 *
 * @returns - Promise resolving the token pair.
 */
export const getTokenPair = async (): Promise<Token> => {
  const credentials = {
    username: Bun.env.YAZIO_TEST_USERNAME!,
    password: Bun.env.YAZIO_TEST_PASSWORD!,
  };

  // Check if the local environment variables contain a valid token from
  // a previous test run. We do this to the able to keep running tests
  // while developing without spamming their API.
  if (Bun.env.YAZIO_TEST_TOKEN) {
    // TODO: Use `zod` to validate the token.
    const token = JSON.parse(Bun.env.YAZIO_TEST_TOKEN);

    if (token.expires_at > Date.now()) return token;
  }

  // Retrieve a new token through our module code.
  const token = await packageGetTokenPair(credentials);

  const env = Bun.file(ENV_PATH);

  // Update the .env file with the new token so it can be reused.
  const current = env.text();
  Bun.write(
    ENV_PATH,
    current + `\nYAZIO_TEST_TOKEN="${JSON.stringify(token)}"`
  );

  console.log("Token stored in .env file.");

  return token;
};
