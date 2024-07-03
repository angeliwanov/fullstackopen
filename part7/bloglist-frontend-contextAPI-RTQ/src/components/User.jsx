import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const User = ({ users }) => {
  const { id } = useParams();
  const user = users?.find(user => user.id === id);
  if (!user) return null;
  return (
    <div>
      <Typography variant="h3" sx={{ paddingY: "10px" }}>
        {user.name}
      </Typography>
      <Typography variant="h5" sx={{ paddingY: "10px" }}>
        Blogs
      </Typography>
      <ul>
        {user.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
