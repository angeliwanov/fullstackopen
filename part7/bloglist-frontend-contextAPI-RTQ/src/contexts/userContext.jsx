import { createContext, useReducer } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = props => {
  const [user, userDispatch] = useReducer(userReducer, null);

  const loginUser = async (username, password) => {
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    userDispatch({ type: "SET_USER", payload: user });
    window.localStorage.setItem(
      "userBlogappToken",
      JSON.stringify({ ...user, date: Date.now() }),
    );
  };

  return (
    <UserContext.Provider value={{ user, userDispatch, loginUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
