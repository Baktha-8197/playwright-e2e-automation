import { test, expect } from "@playwright/test";

test("Should have navigated to the home page", async ({ page }) => {
  //1.Navigate to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //Assert the visibility and click make appointment button
  await page.getByRole("link", { name: "Make Appointment" }).click();
  
  await page.getByLabel("Username").fill("John Doe");
   await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();

  
  await expect(page.locator("h2")).toContainText("Make Appointment");

  //2.Assert if title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //3.Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});
