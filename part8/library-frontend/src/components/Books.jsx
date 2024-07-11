import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const { data: books, loading } = useQuery(
    ALL_BOOKS
    // {variables: { genre: filter },}
  );

  if (!props.show) {
    return null;
  }

  if (loading) return <div>Loading...</div>;

  const genres = [];

  books.allBooks.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: "left" }}>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.allBooks
            .filter((b) => (filter ? b.genres.includes(filter) : b))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => setFilter("")}>All</button>
      {genres.map((genre) => (
        <button
          key={genre}
          value={genre}
          onClick={(e) => setFilter(e.target.value)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
