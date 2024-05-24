const Notification = ({ message, error }) => {
  if (message === null) return null;

  const notificationStyle = {
    color: `${error ? "red" : "green"}`,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderColor: `${error ? "red" : "green"}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
