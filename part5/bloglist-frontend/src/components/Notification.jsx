const Notification = ({ message }) => {
  return (
    message && (
      <div
        style={{ color: `${message.startsWith("Error") ? "red" : "green"}` }}
        className="error"
      >
        {message}
      </div>
    )
  );
};

export default Notification;
