import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import UserContext from "../contexts/userContext";
import loginService from "../services/login";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(UserContext);
  const queryClient = useQueryClient();
  const loginUserMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleLogin = async e => {
    e.preventDefault();
    // loginUserMutation.mutate({ username, password });
    loginUser(username, password);

    setPassword("");
    setUsername("");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username{" "}
        <input
          data-testid="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          data-testid="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
