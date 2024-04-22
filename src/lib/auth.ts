import {
  YazioAuthInitSchema,
  type Credentials,
  type Token,
  type YazioAuthInit,
} from "@/types/auth";
import { YazioAuthError } from "@/utils/error";

const YAZIO_CLIENT_ID = "1_4hiybetvfksgw40o0sog4s884kwc840wwso8go4k8c04goo4c";
const YAZIO_CLIENT_SECRET = "6rok2m65xuskgkgogw40wkkk8sw0osg84s8cggsc4woos4s8o";

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
    throw new YazioAuthError("Incomplete or missing credentials provided.");

  const res = await fetch(`https://yzapi.yazio.com/v10/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      // These are the credentials of their own OAuth application they use to
      // communicate with their own API.
      client_id: YAZIO_CLIENT_ID,
      client_secret: YAZIO_CLIENT_SECRET,
      username,
      password,
      grant_type: "password",
    }),
  });

  if (!res.ok)
    throw new YazioAuthError(`Error fetching token pair.`, {
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

/**
 * Refresh a previously expired token pair.
 *
 * @param token - Token object containing the key pairs.
 *
 * @returns - Promise resolving to a Token object containing the refreshed key.
 */
export const refreshTokenPair = async (token: Token): Promise<Token> => {
  const res = await fetch(`https://yzapi.yazio.com/v10/oauth/token`, {
    method: "POST",
    body: JSON.stringify({
      client_id: YAZIO_CLIENT_ID,
      client_secret: YAZIO_CLIENT_SECRET,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    }),
  }).then((res) => {
    if (!res.ok)
      throw new YazioAuthError(`Error refreshing token pair.`, {
        details: `Received ${res.status} (${res.statusText}).`,
      });

    return res.json() as Promise<Token>;
  });

  const refreshedToken = {
    ...res,
    expires_at: Date.now() + res.expires_in * 1000,
  };

  YAZIO_TOKEN_PAIR = refreshedToken;

  return refreshedToken;
};

export class YazioAuth {
  private token: Token | null = null;
  private credentials: Credentials | null = null;

  /**
   * Get a valid token pair for the current session.
   *
   * @returns - Promise resolving to a Token object containing the key pairs.
   */
  public authenticate = async (): Promise<Token> => {
    // If a token was previously provided or stored, use it.
    if (this.token) {
      // If the stored token is still valid, return it.
      if (this.token.expires_at > Date.now()) return this.token;

      // Refresh the token if it has expired.
      return (this.token = await refreshTokenPair(this.token));
    }

    // If credentials were provided, fetch a new token.
    return (this.token = await getTokenPair(this.credentials!));
  };

  constructor(init: YazioAuthInit) {
    const res = YazioAuthInitSchema.safeParse(init);

    if (!res.success)
      throw new YazioAuthError("Invalid initialization object provided.", {
        details: res.error.errors.join(", "),
      });

    if (res.data.token) this.token = res.data.token;
    if (res.data.credentials) this.credentials = res.data.credentials;
  }
}
