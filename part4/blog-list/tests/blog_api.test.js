const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("application returns blog posts in the JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("application returns the correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const blogs = await helper.blogsInDd();
  const ids = blogs.map((blog) => blog.id);
  const _ids = blogs.map((blog) => blog._id);
  for (let id of ids) {
    assert(id !== undefined, true);
  }
  for (let _id of _ids) {
    assert(_id === undefined, true);
  }
  assert.strictEqual(blogs.length, ids.length);
});

test("successfully creates a new blog post", async () => {
  const newBlog = {
    title: "JS Async",
    author: "Kyle",
    url: "https://js.com/",
    likes: 4,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDd();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((c) => c.title);
  assert(titles.includes("JS Async"));
});

test("likes property defaults to the value 0 if missing", async () => {
  const newBlog = {
    title: "Async await",
    author: "Kyle",
    url: "https://js.com/",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDd();

  const blogNoLikes = blogs.filter((blog) => blog.title === "Async await")[0];
  assert.strictEqual(blogNoLikes.likes, 0);
});

test("verify that backend responds with status 400 if the title or url properties are missing", async () => {
  const blogNoTitle = {
    author: "Kyle",
    url: "https://js.com/",
    likes: 4,
  };
  const blogNoUrl = {
    title: "Async await",
    author: "Kyle",
    likes: 4,
  };

  await api.post("/api/blogs").send(blogNoTitle).expect(400);
  await api.post("/api/blogs").send(blogNoUrl).expect(400);
});

test("delete a single blog", async () => {
  const blogsAtStart = await helper.blogsInDd();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await helper.blogsInDd();
  assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length);

  const ids = blogsAtEnd.map((blog) => blog.id);
  assert(!ids.includes(blogToDelete.id));
});

test("update a blog", async () => {
  const blogsAtStart = await helper.blogsInDd();
  const blogToUpdate = blogsAtStart[0];

  const updates = {
    likes: 3,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updates).expect(204);

  const blogsAtEnd = await helper.blogsInDd();
  const updatedBlog = blogsAtEnd[0];

  assert(updatedBlog.likes, 3);
});

after(async () => {
  await mongoose.connection.close();
});
