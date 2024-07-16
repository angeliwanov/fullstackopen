import { useEffect, useState } from "react";
import { createNote, getAllNotes } from "./noteServices";
interface Note {
  id: string;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([{ id: "1", content: "testing" }]);

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNote({ content: newNote }).then((data) =>
      setNotes(notes.concat(data))
    );
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(e) => {
            setNewNote(e.target.value);
          }}
        />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id}>{note.content}</li>
      ))}
    </div>
  );
};

export default App;
