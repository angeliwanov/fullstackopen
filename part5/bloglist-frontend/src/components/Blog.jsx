import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlog, user, updateBlog }) => {
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

    await updateBlog(updatedBlog);

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
      <div>
        <p>
          {blog.title} by {blog.author}
          <button className="toggleVisible" onClick={toggleVisible}>
            {visible ? "collapse" : "expand"}
          </button>
        </p>
      </div>
      <div style={show} className="hidden">
        <p>blog.url</p>
        <p>
          {likes}
          <button onClick={handleAddLikes}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {user?.username === blog.user.username && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
