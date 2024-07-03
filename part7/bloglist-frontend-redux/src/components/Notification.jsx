import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  return (
    notification && (
      <div
        style={{
          color: `${notification.startsWith("Error") ? "red" : "green"}`,
        }}
        className="error"
      >
        {notification}
      </div>
    )
  );
};

export default Notification;
