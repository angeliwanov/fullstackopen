const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("totalLikes", () => {
  test("of empty list is null", () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null);
  });
  test("when list has only one blog equals the likes of that", () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog([
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 12,
        },
      ]),
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      }
    );
  });
  test("of a bigger list is calculated right", () => {
    assert.deepStrictEqual(
      listHelper.favoriteBlog([
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 12,
        },
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 45,
        },
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 90,
        },
        {
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          likes: 30,
        },
      ]),
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 90,
      }
    );
  });
});
