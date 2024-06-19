const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Angel Ivanov",
        username: "angelivanov",
        password: "123456",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    // await expect(page.getByText("CSS is for styling")).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "angelivanov", "123456");
    await expect(page.getByText("Angel Ivanov logged")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "angelivanov", "wrong");

    const errorDiv = page.locator(".error");
    await expect(errorDiv).toContainText("Wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("Angel Ivanov logged")).not.toBeVisible();
  });

  describe("when loggen in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "angelivanov", "123456");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        await createNote(page, "third note");
      });

      test("importance can be changed", async ({ page }) => {
        await page.pause();

        // await page
        //   .locator("li")
        //   .filter({ hasText: "second" })
        //   .getByRole("button");

        const otherNoteText = await page.getByText("second note");
        const otherNoteElement = await otherNoteText.locator("..");
        await otherNoteElement
          .getByRole("button", { name: "make not important" })
          .click();

        await page.getByRole("button", { name: "show all" }).click();
        await expect(
          otherNoteElement.getByText("make important")
        ).toBeVisible();
      });
    });
  });
});
