export { getTokenFromCredentials } from "@/api/oauth/token";

export { getProduct } from "@/api/products";
export { searchProducts } from "@/api/products/search";

export {
  getUserConsumedItems,
  addUserConsumedItem,
  removeUserConsumedItem,
} from "@/api/user/consumed";

export { getUserWeight } from "@/api/user/bodyvalues/weight";
export { getUserSuggestedProducts } from "@/api/user/products/suggested";
export { getUserDietaryPreferences } from "@/api/user/diet";
export { getUserExercises } from "@/api/user/exercises";
export { getUserGoals } from "@/api/user/goals";
export { getUserSettings } from "@/api/user/settings";
export { getUserDailySummary } from "@/api/user/summary";
export { getUserWaterIntake } from "@/api/user/water";
export { getUser } from "@/api/user";
