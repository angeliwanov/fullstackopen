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

// const filterReducer = (state = "ALL", action) => {
//   console.log("ACTION filter", action);
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

// export default filterReducer;
