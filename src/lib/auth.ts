import type { Credentials, Token } from "@/types/auth";
import { YazioApiError } from "@/utils/error";
import { YAZIO_CLIENT_ID, YAZUO_CLIENT_SECRET } from "@/client";

let YAZIO_TOKEN_PAIR: Token | null = null;

/**
 * Get either a fresh token pair or one that has previously been stored in
 * memory from a previous request run.
 *
 * @param credentials - Credentials object containing the username and password.
 *
 * @returns - Promise resolving to a Token object containing the key pairs. This
 * is retrieved either from memory or from the API.
 */
export const getTokenPair = async (
  credentials: Credentials
): Promise<Token> => {
  // If a token has been cached and is still valid, reuse it.
  if (YAZIO_TOKEN_PAIR && YAZIO_TOKEN_PAIR.expires_at > Date.now())
    return YAZIO_TOKEN_PAIR;

  const { username, password } = credentials;

  if (!username || !password)
    throw new YazioApiError("Incomplete or missing credentials provided.");

  const res = await fetch(`https://yzapi.yazio.com/v10/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      client_id: YAZIO_CLIENT_ID,
      client_secret: YAZUO_CLIENT_SECRET,
      username,
      password,
      grant_type: "password",
    }),
  });

  if (!res.ok)
    throw new YazioApiError(`Error fetching token pair.`, {
      details: `Received ${res.status} (${res.statusText}).`,
    });

  const tokenData = (await res.json()) as Token;

  const token = {
    ...tokenData,
    expires_at: Date.now() + tokenData.expires_in * 1000,
  };

  YAZIO_TOKEN_PAIR = token;

  return token;
};
