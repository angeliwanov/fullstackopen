import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Menu from "./components/Menu";
import Notification from "./components/Notification";
import User from "./components/User";
import Users from "./components/Users";
import BlogsContext from "./contexts/BlogsContext";
import UserContext from "./contexts/userContext";
import { useBlogs } from "./hooks/useBlogs";
import usersService from "./services/users";
const App = () => {
  const { isLoadingBlogs } = useBlogs();
  const { user } = useContext(UserContext);
  const { blogs } = useContext(BlogsContext);
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryFn: usersService.getUsers,
    queryKey: ["users"],
  });

  if (isLoadingBlogs || isLoadingUsers) return <div>Loading...</div>;

  return (
    <div>
      <Menu user={user} />
      <Notification />

      <Routes>
        <Route path="/" element={<Account user={user} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs" element={<Blogs user={user} blogs={blogs} />} />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
      </Routes>
    </div>
  );
};

export default App;
