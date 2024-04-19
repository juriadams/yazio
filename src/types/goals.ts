import { z } from "zod";

export const GoalsSchema = z.object({
  activity: z.object({
    step: z.number(),
  }),
  bodyvalue: z.object({
    weight: z.number(),
  }),
  energy: z.object({
    energy: z.number(),
  }),
  nutrient: z.object({
    carb: z.number(),
    fat: z.number(),
    protein: z.number(),
  }),
  water: z.object({
    water: z.number(),
  }),
});

export type Goals = z.infer<typeof GoalsSchema>;
