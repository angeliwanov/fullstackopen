import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await onSubmit(username, password);
    setPassword("");
    setUsername("");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
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
