import { test, expect } from "@playwright/test";

test.describe("Login Functionality", () => {
  test.beforeEach("Before All login functionality", async ({ page }) => {
    //Navigate To url
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    //Assert the visibility and click the make appointment button
    await expect(
      page.getByRole("link", { name: "Make Appointment" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Make Appointment" }).click();

    //Assert the login details are available
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );
  });
  test("Login Sucessful scenario for valid credentials", async ({ page }) => {
    //Enter valid credentials
    await page.getByLabel("Username").fill("John Doe");

    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");

    //click checkbox
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();

    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("cell", { name: "9", exact: true }).click();

    await page.getByRole("textbox", { name: "Comment" }).fill("test");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    //Checking appontment
    await expect(page.locator("#summary")).toContainText("Go to Homepage");
    await expect(page.locator("#summary")).toContainText(
      "Please be informed that your appointment has been booked as following:",
    );
  });

  test("Login Unsuccessful scenario for invalid login", async ({ page }) => {
    //Enter valid credentials
    await page.getByLabel("Username").fill("John Smith");

    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
