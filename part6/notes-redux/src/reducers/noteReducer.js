import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [
  { content: "reducer defines how redux store works", important: true, id: 1 },
  { content: "state of store can contain any data", important: false, id: 2 },
];

const generateId = () => {
  return Number(Math.random() * 1000000).toFixed(0);
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      state.push({
        content: action.payload,
        important: false,
        id: generateId(),
      });
    },
    toggleImportanceOf(state, action) {
      console.log(current(state));
      return state.map((note) =>
        note.id === action.payload
          ? { ...note, important: !note.important }
          : note
      );
    },
  },
});

export const { createNote, toggleImportanceOf } = noteSlice.actions;
export default noteSlice.reducer;
