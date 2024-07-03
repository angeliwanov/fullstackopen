import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import User from "./components/User";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

import { loadUserFromLocalStorage } from "./utils/helpers";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const user = loadUserFromLocalStorage();
    dispatch(setUser(user));
  }, [dispatch]);

  const addBlog = (title, author, url) => {
    dispatch(createBlog({ title, author, url }, user));
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <User user={user} />
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onSubmit={addBlog} />
          </Togglable>
        </>
      )}
      <h2>blogs</h2>
      <BlogList user={user} />
    </div>
  );
};

export default App;
