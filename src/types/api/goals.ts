import { z } from "zod";

const UserGoalsSchema = z.object({
  "energy.energy": z.number(),
  "nutrient.protein": z.number(),
  "nutrient.fat": z.number(),
  "nutrient.carb": z.number(),
  "activity.step": z.number(),
  "bodyvalue.weight": z.number(),
  water: z.number(),
});

export type UserGoals = z.infer<typeof UserGoalsSchema>;
