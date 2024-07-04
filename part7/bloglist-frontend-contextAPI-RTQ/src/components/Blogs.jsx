import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = ({ blogs, user }) => {
  const blogForm = useRef();

  return (
    <div className="blogs">
      <Typography variant="h3" sx={{ paddingY: "10px" }}>
        Blogs
      </Typography>
      {user && (
        <Togglable buttonLabel={"create blog"} ref={blogForm}>
          <BlogForm toggle={blogForm} user={user} />
        </Togglable>
      )}
      <TableContainer>
        <Table>
          <TableBody>
            {blogs &&
              blogs
                .slice()
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Link blog={blog} to={`/blogs/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Blogs;
