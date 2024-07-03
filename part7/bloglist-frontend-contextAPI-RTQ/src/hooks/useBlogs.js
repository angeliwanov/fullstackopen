import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import BlogsContext from "../contexts/BlogsContext";
import UserContext from "../contexts/userContext";
import blogService from "../services/blogs";
import { loadUserFromLocalStorage } from "../utils/helpers";

export const useBlogs = () => {
  const { data: blogs, isLoading: isLoadingBlogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const { blogsDispatch } = useContext(BlogsContext);
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    blogsDispatch({ type: "INITIALIZE_BLOGS", payload: blogs });
  }, [blogsDispatch, blogs]);

  useEffect(() => {
    const user = loadUserFromLocalStorage();
    userDispatch({ type: "SET_USER", payload: user });
  }, [userDispatch]);

  return { blogs, isLoadingBlogs };
};
