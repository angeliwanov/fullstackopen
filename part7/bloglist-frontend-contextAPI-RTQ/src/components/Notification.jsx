import { Alert } from "@mui/material";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  return (
    <div>
      {notification && <Alert severity="success">{notification}</Alert>}
    </div>
  );
};

export default Notification;
