import { z } from "zod";

export const DaytimeSchema = z.union([
  z.literal("breakfast"),
  z.literal("lunch"),
  z.literal("dinner"),
  z.literal("snack"),
]);

export type Daytime = z.infer<typeof DaytimeSchema>;
