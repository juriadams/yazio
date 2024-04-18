import { z } from "zod";

import { DaytimeSchema } from "@/types/primitives";

export const ItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  daytime: DaytimeSchema,
  type: z.literal("product"),
  amount: z.number(),
  serving: z.string().nullable(),
  serving_quantity: z.number().nullable(),
});

export type Item = z.infer<typeof ItemSchema>;
