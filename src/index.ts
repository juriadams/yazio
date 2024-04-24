export { YazioAuth } from "@/auth";

import type { YazioAuthInit } from "@/types/auth";
import { YazioAuth } from "@/auth";

import {
  getProduct,
  getUser,
  getUserConsumedItems,
  getUserDietaryPreferences,
  getUserExercises,
  getUserGoals,
  getUserSettings,
  getUserSuggestedProducts,
  getUserWaterIntake,
  getUserWeight,
  searchProducts,
  getUserDailySummary,
  addUserConsumedItem,
  removeUserConsumedItem,
} from "@/api";

class Products {
  private auth: YazioAuth;

  constructor(auth: YazioAuth) {
    this.auth = auth;
  }

  public get = async (id: Parameters<typeof getProduct>[1]) =>
    getProduct(await this.auth.authenticate(), id);

  public search = async (options: Parameters<typeof searchProducts>[1]) =>
    searchProducts(await this.auth.authenticate(), options);
}

class User {
  private auth: YazioAuth;

  constructor(auth: YazioAuth) {
    this.auth = auth;
  }

  public get = async () => getUser(await this.auth.authenticate());

  public getWeight = async (options?: Parameters<typeof getUserWeight>[1]) =>
    getUserWeight(await this.auth.authenticate(), options);

  public getSuggestedProducts = async (
    options: Parameters<typeof getUserSuggestedProducts>[1]
  ) => getUserSuggestedProducts(await this.auth.authenticate(), options);

  public getDietaryPreferences = async () =>
    getUserDietaryPreferences(await this.auth.authenticate());

  public getExercises = async (
    options: Parameters<typeof getUserExercises>[1]
  ) => getUserExercises(await this.auth.authenticate(), options);

  public getGoals = async (options: Parameters<typeof getUserGoals>[1]) =>
    getUserGoals(await this.auth.authenticate(), options);

  public getSettings = async () =>
    getUserSettings(await this.auth.authenticate());

  public getWaterIntake = async (
    options: Parameters<typeof getUserWaterIntake>[1]
  ) => getUserWaterIntake(await this.auth.authenticate(), options);

  public getDailySummary = async (
    options: Parameters<typeof getUserDailySummary>[1]
  ) => getUserDailySummary(await this.auth.authenticate(), options);

  public getConsumedItems = async (
    options: Parameters<typeof getUserConsumedItems>[1]
  ) => getUserConsumedItems(await this.auth.authenticate(), options);

  public addConsumedItem = async (
    options: Parameters<typeof addUserConsumedItem>[1]
  ) => addUserConsumedItem(await this.auth.authenticate(), options);

  public removeConsumedItem = async (
    options: Parameters<typeof removeUserConsumedItem>[1]
  ) => removeUserConsumedItem(await this.auth.authenticate(), options);
}

export class Yazio {
  private auth: YazioAuth;

  public products: Products;
  public user: User;

  /**
   * Create a new YAZIO API client.
   *
   * @param auth - The authentication details. Either in the form of an object
   * containing a previously obtained token pair or account credentials, or an
   * instance of `YazioAuth`.
   */
  constructor(auth: YazioAuth | YazioAuthInit) {
    this.auth = auth instanceof YazioAuth ? auth : new YazioAuth(auth);

    this.products = new Products(this.auth);
    this.user = new User(this.auth);
  }
}
