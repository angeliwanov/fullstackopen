import { Button, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import NotificationContext from "../contexts/NotificationContext";
import blogService from "../services/blogs";

const BlogForm = ({ toggle }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const { setNotification } = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const handleAddBlog = e => {
    e.preventDefault();
    newBlogMutation.mutate({ title, author, url });
    setNotification(`a new blog ${title} by ${author} added`, 3);
    toggle.current.toggleVisibility();
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <form onSubmit={handleAddBlog}>
        <h2>Create a new blog</h2>
        <div>
          <TextField
            label="Title"
            variant="outlined"
            width="50%"
            value={title}
            margin="normal"
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Author"
            variant="outlined"
            width="50%"
            value={author}
            margin="normal"
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Url"
            variant="outlined"
            width="50%"
            value={url}
            margin="normal"
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          size="small"
          className="submitBtn"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
