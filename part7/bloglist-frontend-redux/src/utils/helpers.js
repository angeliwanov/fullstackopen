import blogService from "../services/blogs";

export const loadUserFromLocalStorage = () => {
  const loggedUserJson = window.localStorage.getItem("userBlogappToken");
  const user = JSON.parse(loggedUserJson);
  if (!user) return;
  const expiredTime = (Date.now() - user.date) / 1000;
  if (expiredTime < 3600) {
    blogService.setToken(user.token);
    return user;
  } else {
    window.localStorage.removeItem("userBlogappToken");
    blogService.setToken(null);
  }
};
