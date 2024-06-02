const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });
  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        _id: "665acaa588c791ece1816ef3",
        title: "CSS",
        author: "Angel",
        url: "www.example.com",
        likes: 50,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 50);
  });
  test("of a bigger list is calculated right", () => {
    const blogs = [
      {
        _id: "665acaa588c791ece1816ef3",
        title: "CSS",
        author: "Angel",
        url: "www.example.com",
        likes: 50,
        __v: 0,
      },
      {
        _id: "665acbf93486fd44ad7067d6",
        title: "HTML",
        author: "Emi",
        url: "www.example.com",
        likes: 30,
        __v: 0,
      },
      {
        _id: "665af10ea8324c6f6a1c9fdd",
        title: "React",
        author: "Misho",
        url: "www.example.com",
        likes: 20,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 100);
  });
});
