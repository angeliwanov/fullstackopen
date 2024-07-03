import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("createBlog event handler is called with right details", async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  const container = render(<BlogForm onSubmit={mockHandler} />).container;

  const inputTitle = container.querySelector(".title");
  await user.type(inputTitle, "JS");

  const inputAuthor = container.querySelector(".author");
  await user.type(inputAuthor, "Misho");

  const inputUrl = container.querySelector(".url");
  await user.type(inputUrl, "js.com");

  const submitButton = container.querySelector(".submitBtn");
  await user.click(submitButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler).toHaveBeenCalledWith("JS", "Misho", "js.com");
});
