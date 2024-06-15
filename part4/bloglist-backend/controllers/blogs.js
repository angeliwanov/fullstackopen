const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== user.id) {
      return response.status(401).json({ error: "invalid used" });
    }

    user.blogs = user.blogs.filter((b) => b.toString() !== blog.id);
    await user.save();

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.user,
  };

  const id = request.params.id;

  await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
  response.status(204).end();
});

module.exports = blogsRouter;
