import { z } from "zod";
import { ConsumedItemSchema } from "@/types/api/items";

export const DailySummarySchema = z.object({
  breakfast: ConsumedItemSchema.array(),
  lunch: ConsumedItemSchema.array(),
  dinner: ConsumedItemSchema.array(),
  snack: ConsumedItemSchema.array(),
});

export type DailySummary = z.infer<typeof DailySummarySchema>;
