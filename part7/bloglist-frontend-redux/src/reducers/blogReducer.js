import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload.id);
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      return state.map(b => (b.id === action.payload.id ? action.payload : b));
    },
  },
});

export const { setBlogs, removeBlog, addBlog, like, sort } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const deleteBlog = blogToDelete => {
  if (
    window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
    )
  ) {
    return async dispatch => {
      await blogService.deleteBlog(blogToDelete);
      dispatch(removeBlog(blogToDelete));
    };
  }
};

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(content);
    dispatch(addBlog({ ...newBlog, user }));
  };
};

export const addLike = blogToUpdate => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog(blogToUpdate);
    dispatch(like(updatedBlog));
  };
};

export default blogSlice.reducer;
