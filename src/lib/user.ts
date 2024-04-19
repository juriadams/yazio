import type { User } from "@/types/api/user";
import type { Token } from "@/types/auth";
import { YazioApiError } from "@/utils/error";

/**
 * Get the user details.
 *
 * @param token - The token to use for authentication.
 * @returns - Promise resolving to the user details.
 */
export const getUser = async (token: Token): Promise<User> =>
  fetch("https://yzapi.yazio.com/v14/user", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => {
    if (!res.ok)
      throw new YazioApiError(`Error fetching user details.`, {
        details: `${res.status} ${res.statusText}`,
      });

    return res.json() as Promise<User>;
  });
