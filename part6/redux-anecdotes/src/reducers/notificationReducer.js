import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    sendNotification(state, action) {
      return action.payload;
    },
  },
});

export const { sendNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
