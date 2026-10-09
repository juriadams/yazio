import type { Credentials, Token } from "@/types/auth";
import { YAZIO_CLIENT_ID, YAZIO_CLIENT_SECRET } from "@/utils/constants";
import { fetchYazio } from "@/utils/fetch";

/**
 * Get either a fresh token pair or one that has previously been stored in
 * memory from a previous request run.
 *
 * @param credentials - Credentials object containing the username and password.
 *
 * @returns - Promise resolving to a Token object containing the key pairs. This
 * is retrieved either from memory or from the API.
 */
export const getTokenFromCredentials = async (
  credentials: Credentials
): Promise<Token> => {
  const { username, password } = credentials;

  if (!username || !password)
    throw new Error(
      "Incomplete or missing credentials provided. Either `username` or `password` are missing."
    );

  const token = await fetchYazio<Token>(`/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      client_id: YAZIO_CLIENT_ID,
      client_secret: YAZIO_CLIENT_SECRET,
      username,
      password,
      grant_type: "password",
    }),
  });

  return {
    ...token,
    expires_at: Date.now() + token.expires_in * 1000,
  };
};

/**
 * Refresh an access token using a refresh token.
 * Uses the same /oauth/token endpoint with grant_type: "refresh_token".
 *
 * @param refreshToken - The refresh_token from a previous auth response.
 *
 * @returns - Promise resolving to a new Token (access_token, refresh_token, expires_in).
 */
export const getTokenFromRefreshToken = async (
  refreshToken: string
): Promise<Token> => {
  if (!refreshToken)
    throw new Error("Missing refresh_token. Cannot refresh.");

  const token = await fetchYazio<
    Pick<Token, "token_type" | "access_token" | "refresh_token" | "expires_in">
  >(`/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      client_id: YAZIO_CLIENT_ID,
      client_secret: YAZIO_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  return {
    ...token,
    expires_at: Date.now() + token.expires_in * 1000,
  };
};
