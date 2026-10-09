export type {
  Token,
  Credentials,
  TokenResolver,
  CredentialsResolver,
} from "@/types/auth";

import {
  getTokenFromCredentials,
  getTokenFromRefreshToken,
} from "@/api/oauth/token";
import {
  YazioAuthInitSchema,
  type CredentialsResolver,
  type RefreshHandler,
  type Token,
  type TokenResolver,
  type YazioAuthInit,
} from "@/types/auth";

const resolveCredentials = async (credentials: CredentialsResolver | null) => {
  if (typeof credentials === "function") {
    const result = credentials();
    return result instanceof Promise ? await result : result;
  } else if (credentials instanceof Promise) {
    return await credentials;
  } else {
    return credentials || null;
  }
};

const resolveToken = async (token: TokenResolver | null) => {
  if (typeof token === "function") {
    const result = token();
    return result instanceof Promise ? await result : result;
  } else if (token instanceof Promise) {
    return await token;
  } else {
    return token || null;
  }
};

export class YazioAuth {
  private token: TokenResolver | null = null;
  private credentials: CredentialsResolver | null = null;

  private cachedToken: Token | null = null;

  private onRefresh: RefreshHandler | null = null;

  /**
   * Get a valid token pair for the current session.
   *
   * @returns - Promise resolving to a Token object containing the key pairs.
   */
  public authenticate = async (): Promise<Token> => {
    // If a token was previously fetched and is still valid, re-use it.
    if (this.cachedToken && this.cachedToken.expires_at > Date.now())
      return this.cachedToken;

    const token = await resolveToken(this.token);

    // If a token resolve is provided, resolve the token and return it
    // if it is still valid.
    if (token && token.expires_at > Date.now()) {
      this.cachedToken = token;

      return token;
    }

    // If we have an expired token with refresh_token, try to refresh first.
    const tokenToRefresh = token ?? this.cachedToken;
    if (tokenToRefresh?.refresh_token) {
      try {
        const refreshedToken =
          await getTokenFromRefreshToken(tokenToRefresh.refresh_token);
        this.cachedToken = refreshedToken;
        this.token = refreshedToken;
        if (this.onRefresh) this.onRefresh({ token: refreshedToken });
        return refreshedToken;
      } catch {
        // Refresh failed (e.g. refresh_token revoked); fall through to credentials.
      }
    }

    const credentials = await resolveCredentials(this.credentials);
    if (!credentials)
      throw new Error(
        "Unable to resolve credentials. Please make sure `credentials` is passed correctly."
      );

    const refreshedToken = await getTokenFromCredentials(credentials);
    this.cachedToken = refreshedToken;
    this.token = refreshedToken;
    if (this.onRefresh) this.onRefresh({ token: refreshedToken });
    return refreshedToken;
  };

  constructor(init: YazioAuthInit) {
    const res = YazioAuthInitSchema.safeParse(init);

    if (!res.success)
      throw new Error(
        `Could not parse given YazioAuthInit object. Please make sure it is in the correct format.`
      );

    if (res.data.token) this.token = res.data.token;
    if (res.data.credentials) this.credentials = res.data.credentials;
    if (res.data.onRefresh) this.onRefresh = res.data.onRefresh;
  }
}
