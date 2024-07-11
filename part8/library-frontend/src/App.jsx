import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import { updateCache } from "./utils";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} was added`);
      updateCache(
        client.cache,
        [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
        addedBook
      );
    },
  });

  useEffect(() => {
    const session = localStorage.getItem("library-user-token");
    if (session) {
      setToken(session);
    }
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setToken(null);
      localStorage.clear();
      client.resetStore();
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setPage={setPage} />
      <Recommend show={page === "recommend"} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
