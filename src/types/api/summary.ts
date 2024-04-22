import { z } from "zod";

export const NutrientsSchema = z.object({
  "energy.energy": z.number(),
  "nutrient.carb": z.number(),
  "nutrient.fat": z.number(),
  "nutrient.protein": z.number(),
});

export type Nutrients = z.infer<typeof NutrientsSchema>;

export const MealSchema = z.object({
  energy_goal: z.number(),
  nutrients: NutrientsSchema,
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
