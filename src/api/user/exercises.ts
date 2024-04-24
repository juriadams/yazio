import type { Token } from "@/types/auth";
import { parseDate } from "@/utils/date";
import { fetchYazio } from "@/utils/fetch";
import { z } from "zod";

const GetUserExercisesOptionsSchema = z.object({
  date: z.union([z.date(), z.string()]).optional(),
});

type GetUserExercisesOptions = z.infer<typeof GetUserExercisesOptionsSchema>;

export const ExerciseSchema = z.object({
  id: z.string().uuid(),
  note: z.string().nullable(),
  date: z.string(),
  name: z.string(),
  external_id: z.string().nullable(),
  energy: z.number(),
  distance: z.number(),
  duration: z.number(),
  source: z.string().nullable(),
  gateway: z.string().nullable(),
  steps: z.number(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;

/**
 * Get the exercises done by the user, optionally for a specific day.
 *
 * @param token - The token to use for authentication.
 * @param options - Optional options to customize the request.
 *
 * @returns - Promise resolving to the user exercises.
 */
export const getUserExercises = async (
  token: Token,
  options?: GetUserExercisesOptions
): Promise<{
  training: Array<Exercise>;
  custom_training: Array<Exercise>;
}> =>
  fetchYazio<{
    training: Array<Exercise>;
    custom_training: Array<Exercise>;
  }>(`/user/exercises?date=${parseDate(options?.date ?? new Date())}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
