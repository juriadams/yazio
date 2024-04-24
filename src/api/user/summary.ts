import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";
import { BasicNutrientsSchema } from "@/api/products/search";

const GetUserDailySummaryOptions = z.object({
  date: z.union([z.date(), z.string()]).optional(),
});

type GetUserDailySummaryOptions = z.infer<typeof GetUserDailySummaryOptions>;

export const MealSchema = z.object({
  energy_goal: z.number(),
  nutrients: BasicNutrientsSchema,
});

export type Meal = z.infer<typeof MealSchema>;

export const MealsSchema = z.object({
  breakfast: MealSchema,
  lunch: MealSchema,
  dinner: MealSchema,
  snack: MealSchema,
});

export type Meals = z.infer<typeof MealsSchema>;

export const GoalsSchema = z.object({
  "energy.energy": z.number(),
  water: z.number(),
  "activity.step": z.number(),
  "nutrient.protein": z.number(),
  "nutrient.fat": z.number(),
  "nutrient.carb": z.number(),
  "bodyvalue.weight": z.number(),
});

export type Goals = z.infer<typeof GoalsSchema>;

export const UnitsSchema = z.object({
  unit_mass: z.string(),
  unit_energy: z.string(),
  unit_serving: z.string(),
  unit_length: z.string(),
});

export type Units = z.infer<typeof UnitsSchema>;

export const UserSchema = z.object({
  start_weight: z.number().optional(),
  current_weight: z.number().optional(),
  goal: z.string().optional(),
  sex: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const UserDailySummarySchema = z.object({
  activity_energy: z.number(),
  consume_activity_energy: z.boolean(),
  steps: z.number(),
  water_intake: z.number(),
  goals: GoalsSchema,
  units: UnitsSchema,
  meals: MealsSchema,
  user: UserSchema,
  active_fasting_countdown_template_key: z.string().nullable(),
});

export type UserDailySummary = z.infer<typeof UserDailySummarySchema>;

/**
 * Get the daily summary for a specific day.
 *
 * @param token - Token to use for authentication.
 * @param options - Options for the request.
 *
 * @returns - Promise resolving the daily summary.
 */
export const getUserDailySummary = async (
  token: Token,
  options?: GetUserDailySummaryOptions
): Promise<UserDailySummary> =>
  fetchYazio<UserDailySummary>(
    `/user/widgets/daily-summary?date=${parseDate(
      options?.date ?? new Date()
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    }
  );
