const { test, describe, expect, beforeEach } = require("@playwright/test");
const { login, createBlog } = require("./test-helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Angel Ivanov",
        username: "angelivanov",
        password: "123456",
      },
    });
    await request.post("/api/users", {
      data: {
        name: "Mihail Ivanov",
        username: "mihailivanov",
        password: "123456",
      },
    });
    await page.goto("/");
  });

  test("login from is shown", async ({ page }) => {
    await expect(page.getByTestId("username")).toBeVisible();
    await expect(page.getByTestId("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, "angelivanov", "123456");
      await expect(page.getByText("Angel Ivanov logged")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await login(page, "angelivanov", "wrongpassword");
      await expect(
        page.getByText("Error: wrong username or password")
      ).toBeVisible();
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Error: wrong username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("Angel Ivanov logged")).not.toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      login(page, "angelivanov", "123456");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "React", "Dan Abramov", "react.org");

      await expect(
        page.getByText(`a new blog React by Dan Abramov added`)
      ).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      await createBlog(page, "React", "Dan Abramov", "react.org");
      await page.getByRole("button", { name: "expand" }).click();
      await expect(page.getByText("0")).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("1")).toBeVisible();
    });

    test("user who created the blog can delete it", async ({ page }) => {
      await createBlog(page, "React", "Dan Abramov", "react.org");
      await page.getByRole("button", { name: "expand" }).click();
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();
      await expect(
        page.getByText("React by Dan Abramovcollapse")
      ).not.toBeVisible();
    });

    test("user who didn't create the blog cannnot delete it", async ({
      page,
    }) => {
      await createBlog(page, "JS", "Dan Abramov", "js.org");
      await page.getByRole("button", { name: "log out" }).click();
      await login(page, "mihailivanov", "123456");
      await page.getByRole("button", { name: "expand" }).click();
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });

    test("blogs are arranged in order according to likes", async ({ page }) => {
      await createBlog(page, "React", "Dan Abramov", "react.org");
      await createBlog(page, "JS", "Kyle", "js.org");

      await expect(page.getByTestId("blog").first()).toContainText(
        "React by Dan Abramov"
      );
      await expect(page.getByTestId("blog").nth(1)).toContainText("JS by Kyle");

      await page
        .locator("p")
        .filter({ hasText: "React by Dan Abramov expand" })
        .getByRole("button")
        .click();
      await page.getByRole("button", { name: "like" }).click();

      await page
        .locator("p")
        .filter({ hasText: "JS by Kyle expand" })
        .getByRole("button")
        .click();
      await page.getByRole("button", { name: "like" }).nth(1).click();
      await page.getByRole("button", { name: "like" }).nth(1).click();
      await page.getByRole("button", { name: "like" }).nth(1).click();

      await expect(page.getByTestId("blog").first()).toContainText(
        "JS by Kyle"
      );
      await expect(page.getByTestId("blog").nth(1)).toContainText(
        "React by Dan Abramov"
      );
    });
  });
});
