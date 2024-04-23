export type {
  Token,
  Credentials,
  TokenResolver,
  CredentialsResolver,
} from "@/types/auth";

import { getTokenFromCredentials } from "@/api/oauth/token";
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

  private onRefresh: RefreshHandler | null = null;

  /**
   * Get a valid token pair for the current session.
   *
   * @returns - Promise resolving to a Token object containing the key pairs.
   */
  public authenticate = async (): Promise<Token> => {
    const token = await resolveToken(this.token);

    // If a token was provided or previously stored and it is not expired yet,
    // return it.
    if (token && token.expires_at > Date.now()) return token;

    const credentials = await resolveCredentials(this.credentials);
    if (!credentials)
      throw new Error(
        "Unable to resolve credentials. Please make sure `credentials` is passed correctly."
      );

    // If only credentials were provided or if the token expired, fetch a
    // fresh one.
    // TODO (@juriadams): Investigate if tere is an endpoint for refreshing
    // tokens instead of fetching new ones every time.
    const refreshedToken = await getTokenFromCredentials(credentials!);
    this.token = refreshedToken;

    // If a custom `onRefresh` handler is set, invoke it.
    if (this.onRefresh) this.onRefresh({ token: refreshedToken });

    return refreshedToken;
  };

  constructor(init: YazioAuthInit) {
    const res = YazioAuthInitSchema.safeParse(init);

    if (!res.success)
      throw new Error(
        "No credentials or token provided. At least one of them is required."
      );

    if (res.data.token) this.token = res.data.token;
    if (res.data.credentials) this.credentials = res.data.credentials;
    if (res.data.onRefresh) this.onRefresh = res.data.onRefresh;
  }
}
