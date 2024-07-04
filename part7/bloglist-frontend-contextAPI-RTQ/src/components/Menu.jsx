import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Menu = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit">
          <Link to="/blogs" style={{ textDecoration: "none" }}>
            blogs
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/users" style={{ textDecoration: "none" }}>
            users
          </Link>
        </Button>
        <div style={{ marginLeft: "auto" }}>
          {user ? (
            <Logout user={user} />
          ) : (
            <Button>
              <Link to="/" style={{ textDecoration: "none" }}>
                login
              </Link>
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
