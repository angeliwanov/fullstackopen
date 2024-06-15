import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const show = { display: visible ? "" : "none" };

  const handleAddLikes = async () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };

    await blogService.updateBlog(updatedBlog);
    setLikes((likes) => (likes += 1));
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog);
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={{ border: "1px solid black", margin: "5px", padding: "5px" }}>
      <p>
        title: {blog.title}{" "}
        <button onClick={toggleVisible}>
          {visible ? "collapse" : "expand"}
        </button>
      </p>
      <p style={show}>url: {blog.url}</p>
      <p style={show}>
        likes: {likes}
        <button onClick={handleAddLikes}>like</button>
      </p>
      <p style={show}>author: {blog.author}</p>
      <p style={show}>user: {blog.user.name}</p>
      {user?.username === blog.user.username && (
        <button style={show} onClick={handleDelete}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;
