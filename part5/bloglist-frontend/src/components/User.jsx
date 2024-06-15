import blogService from "../services/blogs";

const User = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("userBlogappToken");
    setUser(null);
    blogService.setToken(null);
  };
  return (
    <div style={{ marginBottom: "15px" }}>
      <h2>user</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default User;
