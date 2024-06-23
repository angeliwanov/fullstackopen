import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    filterChange(state, action) {
      console.log(state);
      return action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterChange } = filterSlice.actions;
