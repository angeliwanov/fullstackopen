import React from "react";
import Home from "./Home";
import LoginForm from "./LoginForm";

const Account = ({ user }) => {
  return <div>{user ? <Home /> : <LoginForm />}</div>;
};

export default Account;
