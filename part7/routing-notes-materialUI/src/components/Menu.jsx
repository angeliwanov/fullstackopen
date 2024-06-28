import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const Menu = ({ user }) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/notes">
          notes
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
