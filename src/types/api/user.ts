import { z } from "zod";

export const UserSchema = z.object({
  diet: z.object({
    carb_percentage: z.number(),
    fat_percentage: z.number(),
    protein_percentage: z.number(),
    name: z.string(),
  }),
  body_height: z.number().nullable(),
  city: z.string().nullable(),
  country: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  email: z.string().nullable(),
  email_confirmation_status: z.string().nullable(),
  first_name: z.string().nullable(),
  goal: z.string().nullable(),
  last_name: z.string().nullable(),
  login_type: z.string(),
  newsletter_opt_in: z.boolean(),
  premium_type: z.string(),
  profile_image: z.string(),
  registration_date: z.string(),
  reset_date: z.string().nullable(),
  sex: z.string(),
  siwa_user_id: z.string().nullable(),
  start_weight: z.number(),
  timezone_offset: z.number(),
  unit_energy: z.string(),
  unit_glucose: z.string(),
  unit_length: z.string(),
  unit_mass: z.string(),
  unit_serving: z.string(),
  user_token: z.string(),
  uuid: z.string(),
  weight_change_per_week: z.number(),
});

export type User = z.infer<typeof UserSchema>;
