const Notification = ({ notification }) => {
  if (!notification) return null;
  return (
    <div style={{ border: "5px solid green", padding: "5px" }}>
      {notification}
    </div>
  );
};

export default Notification;
