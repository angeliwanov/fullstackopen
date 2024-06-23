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

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(sendNotification(message));
    setTimeout(() => {
      dispatch(sendNotification(""));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
