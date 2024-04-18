import { getTokenPair } from "@/lib/auth";
import type { Token } from "@/types/auth";
import { resolve } from "node:path";

const ENV_PATH = resolve(import.meta.path, "../../../.env");

/**
 * Exchange a set of credentials (username and password) for a pair of
 * access and refresh tokens.
 *
 * @param credentials
 * @returns
 */
export const getTokenPairInTests = async (credentials: {
  username: string;
  password: string;
}): Promise<Token> => {
  // Check if the local environment variables contain a valid token from
  // a previous test run. We do this to the able to keep running tests
  // while developing without spamming their API.
  if (Bun.env.YAZIO_TEST_TOKEN) {
    // TODO: Use `zod` to validate the token.
    const token = JSON.parse(Bun.env.YAZIO_TEST_TOKEN);

    if (token.expires_at > Date.now()) return token;
  }

  // Retrieve a new token through our module code.
  const token = await getTokenPair(credentials);

  // Store the token in the process directly so the test command does not need
  // to be restarted.
  Bun.env.YAZIO_TEST_TOKEN = JSON.stringify(token);

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
