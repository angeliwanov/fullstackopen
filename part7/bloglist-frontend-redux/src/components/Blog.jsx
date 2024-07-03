import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const disabled = useSelector(({ notification }) =>
    notification ? true : false,
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const show = { display: visible ? "" : "none" };

  const handleAddLikes = async () => {
    dispatch(addLike({ ...blog, user: blog?.user?.id, likes: blog.likes + 1 }));
    dispatch(setNotification(`you voted ${blog.title}`, 3));
  };

  const handleDelete = async () => {
    dispatch(deleteBlog(blog));
    dispatch(setNotification(`you deleted ${blog.title}`, 3));
  };

  return (
    <div
      style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
      data-testid="blog"
    >
      <div>
        <p>
          {blog.title} by {blog.author}{" "}
          <button className="toggleVisible" onClick={toggleVisible}>
            {visible ? "collapse" : "expand"}
          </button>
        </p>
      </div>
      <div style={show} className="hidden">
        <p>blog.url</p>
        <p>
          {blog.likes}{" "}
          <button disabled={disabled} onClick={handleAddLikes}>
            like
          </button>
        </p>
        <p>{blog?.user?.name}</p>
        {user?.username === blog?.user?.username && (
          <button disabled={disabled} onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
