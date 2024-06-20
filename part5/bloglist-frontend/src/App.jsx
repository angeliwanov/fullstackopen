import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import User from "./components/User";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("userBlogappToken");
    const user = JSON.parse(loggedUserJson);
    if (!user) return;
    const expiredTime = (Date.now() - user.date) / 1000;
    if (expiredTime < 3600) {
      setUser(user);
      blogService.setToken(user.token);
    } else {
      window.localStorage.removeItem("userBlogappToken");
      blogService.setToken(null);
    }
  }, []);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const updateBlog = async (updatedBlog) => {
    await blogService.updateBlog(updatedBlog);
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem(
        "userBlogappToken",
        JSON.stringify({ ...user, date: Date.now() })
      );
      blogService.setToken(user.token);
    } catch (error) {
      setErrorMessage("Error: wrong username or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const addBlog = async (title, author, url) => {
    try {
      const newBlog = await blogService.createBlog({
        title,
        author,
        url,
      });
      setBlogs(blogs.concat({ ...newBlog, user }));
      blogFormRef.current.toggleVisibility();
      setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage("Error: blog could not be created");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const loginForm = () => {
    return <LoginForm onSubmit={login} />;
  };

  const blogForm = () => {
    return (
      <>
        <User user={user} setUser={setUser} />
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm onSubmit={addBlog} />
        </Togglable>
      </>
    );
  };

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : blogForm()}
      <h2>blogs</h2>
      <div className="blogs">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            user={user}
            updateBlog={updateBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
