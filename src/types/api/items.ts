import { z } from "zod";

import { DaytimeSchema } from "@/types/primitives";

export const ConsumedItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  daytime: DaytimeSchema,
  type: z.literal("product"),
  amount: z.number(),
  serving: z.string().nullable(),
  serving_quantity: z.number().nullable(),
});

export type ConsumedItem = z.infer<typeof ConsumedItemSchema>;

export const UserConsumedItems = z.object({
  products: ConsumedItemSchema.array(),
  recipe_portions: z.array(z.unknown()),
  simple_products: z.array(z.unknown()),
});

export type UserConsumedItems = z.infer<typeof UserConsumedItems>;
