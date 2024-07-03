import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    "",
  );

  const setNotification = (message, time) => {
    notificationDispatch({ type: "NOTIFICATION", payload: message });
    setTimeout(() => {
      notificationDispatch({ type: "NOTIFICATION", payload: "" });
    }, time * 1000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
