import type { Token } from "@/types/auth";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

export const UserDietaryPreferencesSchema = z.object({
  restriction: z.string().nullable(),
});

export type UserDietaryPreferences = z.infer<
  typeof UserDietaryPreferencesSchema
>;

/**
 * Get the dietary preferences of the user.
 *
 * @param token - The token to use for authentication.
 *
 * @returns - Promise resolving to the user dietary preferences.
 */
export const getUserDietaryPreferences = async (
  token: Token
): Promise<UserDietaryPreferences> =>
  fetchYazio<UserDietaryPreferences>(`/user/dietary-preferences`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
