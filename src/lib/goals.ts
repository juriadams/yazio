import type { UserGoals } from "@/types/api/goals";
import type { Token } from "@/types/auth";
import type { Goals } from "@/types/goals";
import { parseDate } from "@/utils/date";
import { YazioApiError } from "@/utils/error";
import { z } from "zod";

export const GetGoalsOptionsSchema = z.object({
  date: z.date().optional(),
});

export type GetGoalsOptions = z.infer<typeof GetGoalsOptionsSchema>;

export const getGoals = async (
  token: Token,
  options?: GetGoalsOptions
): Promise<Goals> => {
  const date = parseDate(options?.date ?? new Date());

  return fetch(`https://yzapi.yazio.com/v14/user/goals?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  })
    .then((res) => {
      if (!res.ok)
        throw new YazioApiError(`Error fetching goals.`, {
          details: `${res.status} ${res.statusText}`,
        });

      return res.json() as Promise<UserGoals>;
    })
    .then(
      (goals) =>
        ({
          activity: {
            step: goals["activity.step"],
          },
          bodyvalue: {
            weight: goals["bodyvalue.weight"],
          },
          energy: {
            energy: goals["energy.energy"],
          },
          nutrient: {
            carb: goals["nutrient.carb"],
            fat: goals["nutrient.fat"],
            protein: goals["nutrient.protein"],
          },
          water: {
            water: goals.water,
          },
        } satisfies Goals)
    );
};
