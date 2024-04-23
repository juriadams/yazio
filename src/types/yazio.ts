import { z } from "zod";

export const DaytimeSchema = z.enum(["breakfast", "lunch", "dinner", "snack"]);

export type Daytime = z.infer<typeof DaytimeSchema>;
