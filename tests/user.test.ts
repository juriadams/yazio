import { describe, test, expect } from "bun:test";
import { z } from "zod";

import { Yazio } from "@/index";
import { UserSchema, type User } from "@/api/user/index";
import {
  UserWeightSchema,
  type UserWeight,
} from "@/api/user/bodyvalues/weight";
import {
  UserSuggestedProductSchema,
  type UserSuggestedProduct,
} from "@/api/user/products/suggested";
import {
  UserDietaryPreferencesSchema,
  type UserDietaryPreferences,
} from "@/api/user/diet";
import { ExerciseSchema } from "@/api/user/exercises";
import { UserGoalsSchema, type UserGoals } from "@/api/user/goals";
import { UserSettingsSchema, type UserSettings } from "@/api/user/settings";
import {
  UserWaterIntakeSchema,
  type UserWaterIntake,
} from "@/api/user/water";
import {
  UserDailySummarySchema,
  type UserDailySummary,
} from "@/api/user/summary";
import {
  GetUserConsumedItemsResponseSchema,
  type GetUserConsumedItemsResponse,
} from "@/api/user/consumed";
import { RecipeSchema, type Recipe } from "@/api/user/recipes";

const ExercisesResponseSchema = z.object({
  training: z.array(ExerciseSchema),
  custom_training: z.array(ExerciseSchema),
});
type ExercisesResponse = z.infer<typeof ExercisesResponseSchema>;

function createYazio() {
  if (!Bun.env.YAZIO_USERNAME || !Bun.env.YAZIO_PASSWORD) {
    throw new Error(
      "YAZIO_USERNAME and YAZIO_PASSWORD must be set in env to run user tests"
    );
  }
  return new Yazio({
    credentials: {
      username: Bun.env.YAZIO_USERNAME,
      password: Bun.env.YAZIO_PASSWORD,
    },
  });
}

describe("user", () => {
  describe("response shape validation", () => {
    test("get returns valid user shape", async () => {
      const yazio = createYazio();
      const result: User = await yazio.user.get();
      const parsed = UserSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getWeight returns valid weight or null", async () => {
      const yazio = createYazio();
      const result: UserWeight | null = await yazio.user.getWeight();
      if (result === null) return;
      const parsed = UserWeightSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getSuggestedProducts returns valid array shape", async () => {
      const yazio = createYazio();
      const result: UserSuggestedProduct[] =
        await yazio.user.getSuggestedProducts({ daytime: "breakfast" });
      const parsed = z.array(UserSuggestedProductSchema).safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getDietaryPreferences returns valid shape", async () => {
      const yazio = createYazio();
      const result: UserDietaryPreferences =
        await yazio.user.getDietaryPreferences();
      const parsed = UserDietaryPreferencesSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getExercises returns valid shape", async () => {
      const yazio = createYazio();
      const result: ExercisesResponse = await yazio.user.getExercises();
      const parsed = ExercisesResponseSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getGoals returns valid shape", async () => {
      const yazio = createYazio();
      const result: UserGoals = await yazio.user.getGoals();
      const parsed = UserGoalsSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getSettings returns valid shape", async () => {
      const yazio = createYazio();
      const result: UserSettings = await yazio.user.getSettings();
      const parsed = UserSettingsSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getWaterIntake returns valid shape", async () => {
      const yazio = createYazio();
      const result: UserWaterIntake = await yazio.user.getWaterIntake();
      const parsed = UserWaterIntakeSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getDailySummary returns valid shape", async () => {
      const yazio = createYazio();
      const result: UserDailySummary = await yazio.user.getDailySummary();
      const parsed = UserDailySummarySchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getConsumedItems returns valid shape", async () => {
      const yazio = createYazio();
      const result: GetUserConsumedItemsResponse =
        await yazio.user.getConsumedItems();
      const parsed = GetUserConsumedItemsResponseSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getRecipe returns valid recipe shape when user has recipe portions", async () => {
      const yazio = createYazio();
      const consumed: GetUserConsumedItemsResponse =
        await yazio.user.getConsumedItems();
      const recipeId = consumed.recipe_portions[0]?.recipe_id;
      if (!recipeId) return; // skip if no recipe portions
      const result: Recipe = await yazio.user.getRecipe(recipeId);
      const parsed = RecipeSchema.safeParse(result);
      expect(parsed.success).toBe(true);
    });

    test("getRecipeIds returns valid array of UUIDs", async () => {
      const yazio = createYazio();
      const result: string[] = await yazio.user.getRecipeIds();
      const parsed = z.array(z.string().uuid()).safeParse(result);
      expect(parsed.success).toBe(true);
    });
  });

  describe("consumed items", () => {
    test("add a specific amount then remove (clean up for prod user)", async () => {
      const yazio = createYazio();
      const entryId = crypto.randomUUID();
      await yazio.user.addConsumedItem({
        id: entryId,
        product_id: "9e219ae8-becf-11e6-b9dc-e0071b8a8723",
        date: new Date(),
        daytime: "breakfast",
        amount: 100,
        serving: null,
        serving_quantity: null,
      });
      await yazio.user.removeConsumedItem(entryId);
    });

    test("add a serving then remove (clean up for prod user)", async () => {
      const yazio = createYazio();
      const entryId = crypto.randomUUID();
      await yazio.user.addConsumedItem({
        id: entryId,
        product_id: "9e219ae8-becf-11e6-b9dc-e0071b8a8723",
        date: new Date(),
        daytime: "breakfast",
        amount: 80,
        serving: "roll",
        serving_quantity: 1,
      });
      await yazio.user.removeConsumedItem(entryId);
    });

    test("add multiple servings then remove (clean up for prod user)", async () => {
      const yazio = createYazio();
      const entryId = crypto.randomUUID();
      await yazio.user.addConsumedItem({
        id: entryId,
        product_id: "9e219ae8-becf-11e6-b9dc-e0071b8a8723",
        date: new Date(),
        daytime: "breakfast",
        amount: 160,
        serving: "roll",
        serving_quantity: 2,
      });
      await yazio.user.removeConsumedItem(entryId);
    });
  });
});
