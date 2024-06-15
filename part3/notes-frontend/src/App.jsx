import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import LoginFrom from "./components/LoginForm";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import loginService from "./services/login";
import noteServices from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialNotes = await noteServices.getAll();
        setNotes(initialNotes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    const user = JSON.parse(loggedUserJSON);
    if (user) {
      setUser(user);
      noteServices.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };

    try {
      const updatedNote = await noteServices.update(id, changeNote);
      setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
    } catch (error) {
      setErrorMessage(`Note ${note.content} was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const addNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    const returnedNote = await noteServices.create(noteObject);
    setNotes(notes.concat(returnedNote));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete the note?")) {
      await noteServices.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      noteServices.setToken(user.token);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        <Togglable buttonLabel="reveal">
          <LoginFrom handleSubmit={handleLogin} />
        </Togglable>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <p>{user.name} logged</p>
          <button style={{ marginBottom: "20px" }} onClick={handleLogout}>
            logout
          </button>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            handleDelete={() => handleDelete(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;
