import { z } from "zod";
import { ItemSchema } from "@/types/item";

export const DailySummarySchema = z.object({
  products: ItemSchema.array(),
  recipe_portions: z.array(z.unknown()),
  simple_products: z.array(z.unknown()),
});

export type DailySummary = z.infer<typeof DailySummarySchema>;
