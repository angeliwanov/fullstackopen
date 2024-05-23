import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteServices from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);

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

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };

    try {
      const updatedNote = await noteServices.update(id, changeNote);
      setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
    } catch (error) {
      alert(`the note ${note.content} was already deleted from the server`);
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    const createdNote = await noteServices.create(noteObject);
    setNotes(notes.concat(createdNote));
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
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
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
