import PropTypes from "prop-types";
import { useState } from "react";

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    onSubmit(title, author, url);
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <form onSubmit={handleAddBlog}>
        <h2>create a new blog</h2>
        <div>
          title{" "}
          <input
            className="title"
            value={title}
            type="text"
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            className="author"
            value={author}
            type="text"
            name="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url{" "}
          <input
            value={url}
            type="text"
            name="Url"
            className="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button className="submitBtn" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BlogForm;
