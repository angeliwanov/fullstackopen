import { useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const handleChangeOfImportance = (note) => {
    const noteToUpdate = {
      ...note,
      important: !note.important,
    };
    noteService.updateNote(noteToUpdate);
    dispatch(toggleImportanceOf(noteToUpdate));
  };

  return (
    <li onClick={() => handleChangeOfImportance(note)}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

export default Note;
