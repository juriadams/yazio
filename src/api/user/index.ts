import type { Token } from "@/types/auth";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

export const UserSchema = z.object({
  diet: z
    .object({
      carb_percentage: z.number(),
      fat_percentage: z.number(),
      protein_percentage: z.number(),
      name: z.string(),
    })
    .nullable(),
  email: z.string().email(),
  premium_type: z.string(),
  sex: z.enum(["male", "female", "other"]),
  first_name: z.string(),
  last_name: z.string(),
  city: z.string(),
  country: z.string().length(2),
  weight_change_per_week: z.number(),
  body_height: z.number(),
  goal: z.string(),
  date_of_birth: z.string(),
  registration_date: z.string(),
  timezone_offset: z.number(),
  unit_length: z.string(),
  unit_mass: z.string(),
  unit_glucose: z.string(),
  unit_serving: z.string(),
  unit_energy: z.string(),
  food_database_country: z.string().length(2),
  profile_image: z.string().url(),
  user_token: z.string(),
  start_weight: z.number(),
  email_confirmation_status: z.enum(["confirmed", "unconfirmed"]),
  newsletter_opt_in: z.boolean(),
  login_type: z.string(),
  siwa_user_id: z.string().nullable(),
  uuid: z.string().uuid(),
  reset_date: z.string().nullable(),
  activity_degree: z.string(),
  stripe_customer_id: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Get the user details.
 *
 * @param token - The token to use for authentication.
 *
 * @returns - Promise resolving to the user details.
 */
export const getUser = async (token: Token): Promise<User> =>
  fetchYazio<User>("/user", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
