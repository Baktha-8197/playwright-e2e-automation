import { test, expect } from "@playwright/test";

test.describe("Login and assert the navigation", () => {
  test.beforeEach("test", async ({ page }) => {
    //login
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/inventory/);
  });

  test("Inventory checking", async ({ page }) => {
    let allInventoryItems = page.locator(".inventory_item");
    await expect(allInventoryItems).toHaveCount(6);

    let totalProducts = await allInventoryItems.count();
    let priceArr = [];
    for (let i = 0; i < totalProducts; i++) {
      let element = allInventoryItems.nth(i);
      let productName = await element
        .locator(".inventory_item_name")
        .innerText();
      console.log(`Product names: ${productName}`);
      let productPrice = await element
        .locator(".inventory_item_price")
        .innerText();
      priceArr.push(productPrice);
    }

    let priceArrNum = priceArr.map((item) => {
      return parseFloat(item.replace("$", ""));
    });

    let invalidPrice = priceArrNum.filter((item) => item <= 0);

    expect(invalidPrice).toHaveLength(0);
  });
});
