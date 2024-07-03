import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import Blog from "./Blog";

describe("test Blog", () => {
  test("blog displays author and title, but not likes and url", async () => {
    const blog = {
      title: "React",
      author: "Dan Abramov",
      url: "example.com",
      likes: 12,
      user: {
        name: "Angel Ivanov",
      },
    };

    const container = render(<Blog blog={blog} />).container;

    const titleAuthor = await screen.findByText("React by Dan Abramov");

    expect(titleAuthor).toBeDefined();

    const urlLikes = container.querySelector(".hidden");
    expect(urlLikes).toHaveStyle("display: none");
  });

  test("url and likes are displayed when button is clicked", async () => {
    const user = userEvent.setup();

    const blog = {
      title: "React",
      author: "Dan Abramov",
      url: "examine.com",
      likes: 12,
      user: {
        name: "Angel Ivanov",
      },
    };

    const container = render(<Blog blog={blog} />).container;

    const button = container.querySelector(".toggleVisible");
    await user.click(button);

    const urlLikes = container.querySelector(".hidden");
    expect(urlLikes).not.toHaveStyle("display: none");
  });

  test("event handler is called twice on button 'like' click", async () => {
    const user = userEvent.setup();
    const updateBlog = vi.fn();

    const blog = {
      title: "React",
      author: "Dan Abramov",
      url: "examine.com",
      likes: 12,
      user: {
        name: "Angel Ivanov",
      },
    };

    const container = render(
      <Blog blog={blog} updateBlog={updateBlog} />,
    ).container;

    const buttonToggle = container.querySelector(".toggleVisible");
    await user.click(buttonToggle);

    const buttonLike = screen.getByText("like");
    await user.click(buttonLike);
    await user.click(buttonLike);

    expect(updateBlog.mock.calls).toHaveLength(2);
  });
});
