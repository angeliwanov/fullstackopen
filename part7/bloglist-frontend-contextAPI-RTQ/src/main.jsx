import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { BlogsContextProvider } from "./contexts/BlogsContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContextProvider } from "./contexts/userContext";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <BlogsContextProvider>
          <Router>
            <App />
          </Router>
        </BlogsContextProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>,
);
