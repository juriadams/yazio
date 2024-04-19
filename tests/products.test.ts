import { getProduct, searchProducts } from "@/lib/products";
import { ProductSchema, ProductSearchResultSchema } from "@/types/api/products";
import { describe, test, expect } from "bun:test";
import { getTokenPair } from "tests/utils/auth";

describe("products", () => {
  test("get a product by its id", async () => {
    const token = await getTokenPair();
    const product = await getProduct(
      token,
      "9e68690a-becf-11e6-9052-e0071b8a8723"
    );

    // Validate the schema of the returned data.
    const res = ProductSchema.safeParse(product);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);
  });

  test("search for a product", async () => {
    const token = await getTokenPair();
    const products = await searchProducts(token, "Apfel");

    // Validate the schema of the returned data.
    const res = ProductSearchResultSchema.array().safeParse(products);
    if (!res.success) console.error(res.error);

    expect(res.success).toBe(true);

    // Verify at least one correct search result was returned.
    expect(products.length).toBeGreaterThan(0);
    expect(products.some(({ name }) => name.includes("Apfel"))).toBe(true);
  });
});
