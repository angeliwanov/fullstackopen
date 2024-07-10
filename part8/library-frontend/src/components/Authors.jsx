import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const { data: authors, loading } = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const changeAuthor = (e) => {
    e.preventDefault();
    updateAuthor({ variables: { name, setBornTo: born } });
    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.allAuthors.length &&
            authors.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {props.token && (
        <form onSubmit={changeAuthor}>
          <h2>Set birth year</h2>
          <select onChange={(e) => setName(e.target.value)}>
            <option value="">--Choose an author--</option>
            {authors.allAuthors.map((a) => {
              return (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              );
            })}
          </select>
          <div>
            born{" "}
            <input
              type="number"
              value={born}
              onChange={(e) => setBorn(e.target.valueAsNumber)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      )}
    </div>
  );
};

export default Authors;
