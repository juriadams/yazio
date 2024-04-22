import type { YazioAuthInit } from "@/types/auth";
import { YazioAuth } from "@/auth";

import { getGoals, type GetGoalsOptions } from "@/lib/goals";
import {
  getConsumedItems,
  addConsumedItem,
  type GetConsumedItemOptions,
} from "@/lib/items";
import { getSettings } from "@/lib/settings";
import { getDailySummary, type GetDailySummaryOptions } from "@/lib/summary";
import { getUser } from "@/lib/user";
import {
  getProduct,
  searchProducts,
  type GetProductOptions,
  type SearchProductOptions,
} from "@/lib/products";

export class Yazio {
  private auth: YazioAuth;

  /**
   * Get the details of the authenticated user.
   *
   * @returns - Promise resolving the details of the authenticated user.
   */
  public getUserDetails = async () => getUser(await this.auth.authenticate());

  /**
   * Get the settings of the authenticated user.
   *
   * @returns - Promise resolving the settings of the authenticated user.
   */
  public getUserSettings = async () =>
    getSettings(await this.auth.authenticate());

  /**
   * Get the daily summary of the authenticated user, optionally for a
   * specific day.
   *
   * @param options - Options for the request.
   * @returns - Promise resolving the daily summary.
   */
  public getDailySummary = async (options?: GetDailySummaryOptions) =>
    getDailySummary(await this.auth.authenticate(), options);

  /**
   * Get a specific product by its ID.
   *
   * @param options - Object containing the ID of the product.
   * @returns - Promise resolving the product details or `null`.
   */
  public getProduct = async (options: GetProductOptions) =>
    getProduct(await this.auth.authenticate(), options);

  /**
   * Search for a specific product by its name.
   *
   * @param options - Object containing the search query and optional filters.
   * @returns - Promise resolving the search results.
   */
  public searchProducts = async (options: SearchProductOptions) =>
    searchProducts(await this.auth.authenticate(), options);

  /**
   * Get the goals of the authenticated user and their progress, optionally
   * for a specific day.
   *
   * @param options - Options for the request, including the date.
   * @returns - Promise resolving the goals of the authenticated user.
   */
  public getGoals = async (options?: GetGoalsOptions) =>
    getGoals(await this.auth.authenticate(), options);

  /**
   * Get the items consumed by the authenticated user, optionally for a
   * specific day.
   *
   * @param options - Options for the request, including the date.
   * @returns - Promise resolving the consumed items.
   */
  public getConsumedItems = async (options?: GetConsumedItemOptions) =>
    getConsumedItems(await this.auth.authenticate(), options);

  /**
   * Add a consumed item to the users diary.
   *
   * @param product - A `ConsumedItem` to add to the users diary.
   * @param options - Options for the request, including the date.
   * @returns - Promise resolving a currently unknown response.
   */
  public addConsumedItem = async (product: any, options: any) =>
    addConsumedItem(await this.auth.authenticate(), product, options);

  /**
   * Create a new YAZIO API client.
   *
   * @param auth - The authentication details. Either in the form of an object
   * containing a previously obtained token pair or account credentials, or an
   * instance of `YazioAuth`.
   */
  constructor(auth: YazioAuth | YazioAuthInit) {
    if (auth instanceof YazioAuth) this.auth = auth;
    else this.auth = new YazioAuth(auth);
  }
}
