import { useState } from "react";

const LoginFrom = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();

    await handleSubmit({ username, password });

    setPassword("");
    setUsername("");
  };

  return (
    <form onSubmit={loginSubmit} style={{ marginBottom: "20px" }}>
      <div>
        username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginFrom;
