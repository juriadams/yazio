import { z } from "zod";

export const UserSettingsSchema = z.object({
  has_water_tracker: z.boolean(),
  has_diary_tipps: z.boolean(),
  has_meal_reminders: z.boolean(),
  has_usage_reminders: z.boolean(),
  has_weight_reminders: z.boolean(),
  has_water_reminders: z.boolean(),
  consume_activity_calories: z.boolean(),
  has_feelings: z.boolean(),
  has_fasting_tracker_reminders: z.boolean(),
  has_fasting_stage_reminders: z.boolean(),
});

export type UserSettings = z.infer<typeof UserSettingsSchema>;
