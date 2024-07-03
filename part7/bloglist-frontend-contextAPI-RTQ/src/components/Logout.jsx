import { Button } from "@mui/material";
import { useContext } from "react";
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
      <em style={{ marginRight: "10px" }}>{user.name} logged in</em>
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
