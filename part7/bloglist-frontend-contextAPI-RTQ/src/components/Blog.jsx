import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useId, useState } from "react";
import { useParams } from "react-router-dom";
import NotificationContext from "../contexts/NotificationContext";
import UserContext from "../contexts/userContext";
import blogService from "../services/blogs";

const Blog = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs?.find(blog => blog.id === id);
  const { user } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleAddLikes = () => {
    updateBlogMutation.mutate({
      ...blog,
      user: blog?.user?.id,
      likes: blog.likes + 1,
    });
    setNotification(`you voted ${blog.title}`, 3);
  };

  const handleAddComment = e => {
    e.preventDefault();
    if (!comment) return;
    updateBlogMutation.mutate({
      ...blog,
      comments: blog.comments.concat(comment),
      user: blog?.user?.id,
    });
    setNotification(`you voted ${blog.title}`, 3);
    setComment("");
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
      setNotification(`you deleted ${blog.title}`, 3);
    }
  };

  if (!blog) return null;
  return (
    <div data-testid="blog">
      <h1>
        {blog.title} - {blog.author}
      </h1>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <span>{blog.likes} likes</span>{" "}
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={handleAddLikes}
        >
          like
        </Button>
      </div>
      <p>added by {blog?.user?.name}</p>
      {user?.username === blog?.user?.username && (
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={handleDelete}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        >
          delete blog
        </Button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />{" "}
        <Button color="primary" variant="contained" size="small" type="submit">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments &&
          blog.comments.map(comment => {
            return <li key={useId}>{comment}</li>;
          })}
      </ul>
    </div>
  );
};

export default Blog;
