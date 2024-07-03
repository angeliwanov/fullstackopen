import { Typography } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";
const Account = ({ user }) => {
  return (
    <div>
      {user ? (
        <Typography variant="h1" sx={{ padding: "10px" }}>
          Interactive website for creating and reviewing blogs
        </Typography>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default Account;
