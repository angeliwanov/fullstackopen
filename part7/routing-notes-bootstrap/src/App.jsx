import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Note from "./components/Note";
import Notes from "./components/Notes";
import Users from "./components/Users";
const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
    user: "Matti Luukkainen",
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
    user: "Matti Luukkainen",
  },
  {
    id: 3,
    content: "Most important methods of HTTP-protocol are GET and POST",
    important: true,
    user: "Arto Hellas",
  },
];

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const login = (user) => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const match = useMatch("/notes/:id");
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  return (
    <div className="container">
      {message && <Alert variant="success">{message}</Alert>}
      <Menu user={user} />

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <br />
        <em>Note app, Department of Computer Science 2023</em>
      </div>
    </div>
  );
};

export default App;
