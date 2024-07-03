import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    dispatch(setUser(user));
    window.localStorage.setItem(
      "userBlogappToken",
      JSON.stringify({ ...user, date: Date.now() }),
    );
  };
};

export default userSlice.reducer;
