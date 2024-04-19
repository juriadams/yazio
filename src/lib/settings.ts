import type { UserSettings } from "@/types/api/settings";
import type { Token } from "@/types/auth";
import { YazioApiError } from "@/utils/error";

/**
 * Get the user settings.
 *
 * @param token - The token to use for authentication.
 *
 * @returns - Promise resolving to the user settings.
 */
export const getSettings = async (token: Token): Promise<UserSettings> =>
  fetch(`https://yzapi.yazio.com/v14/user/settings`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new YazioApiError(`Error fetching settings.`, {
        details: `${res.status} ${res.statusText}`,
      });
    }

    return res.json() as Promise<UserSettings>;
  });
