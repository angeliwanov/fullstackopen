import { Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import blogService from "../services/blogs";

const Logout = ({ user }) => {
  const { userDispatch } = useContext(UserContext);
  const handleLogout = () => {
    window.localStorage.removeItem("userBlogappToken");
    userDispatch({ type: "SET_USER", payload: null });
    blogService.setToken(null);
  };

  return (
    <div>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          marginRight: "10px",
          color: "white",
          fontStyle: "italic",
        }}
      >
        {user.name} logged in
      </Link>
      <Button
        color="secondary"
        variant="contained"
        size="small"
        onClick={handleLogout}
      >
        log out
      </Button>
    </div>
  );
};

export default Logout;
