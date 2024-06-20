const login = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.locator('input[name="Title"]').click();
  await page.locator('input[name="Title"]').fill(title);
  await page.locator('input[name="Title"]').press("Tab");
  await page.locator('input[name="Author"]').fill(author);
  await page.locator('input[name="Author"]').press("Tab");
  await page.locator('input[name="Url"]').fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.getByText(`${title} by ${author} expand`).waitFor();
};

export { createBlog, login };
