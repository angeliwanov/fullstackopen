const { test, describe, expect, beforeEach } = require("@playwright/test");
const exp = require("constants");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Angel Ivanov",
        username: "angelivanov",
        password: "123456",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    // await expect(page.getByText("CSS is for styling")).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await page.getByRole("button", { name: "log in" }).click();
    await page.getByTestId("username").fill("angelivanov");
    await page.getByTestId("password").fill("123456");
    await page.getByRole("button", { name: "login" }).click();
    await expect(page.getByText("Angel Ivanov logged")).toBeVisible();
  });

  describe("when loggen in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "log in" }).click();
      await page.getByTestId("username").fill("angelivanov");
      await page.getByTestId("password").fill("123456");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "save" }).click();
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "new note" }).click();
        await page.getByRole("textbox").fill("another note by playwright");
        await page.getByRole("button", { name: "save" }).click();
      });

      test("importance can be changed", async ({ page }) => {
        await page.getByRole("button", { name: "make not important" }).click();
        await expect(page.getByText("show all")).toBeVisible();
      });
    });
  });
});
