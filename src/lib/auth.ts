import type { Credentials, Token } from "@/types/auth";
import { YazioApiError } from "@/utils/error";

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
      // These are the credentials of their own OAuth application they use to
      // communicate with their own API.
      client_id: "1_4hiybetvfksgw40o0sog4s884kwc840wwso8go4k8c04goo4c",
      client_secret: "6rok2m65xuskgkgogw40wkkk8sw0osg84s8cggsc4woos4s8o",
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
