import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommend = ({ show }) => {
  const { data: books, loading: loadingBooks } = useQuery(ALL_BOOKS);
  const { data: user, loading: loadingUser } = useQuery(ME);
  if (!show) {
    return null;
  }

  if (loadingBooks || loadingUser) return <div>Loading...</div>;

  const filter = user.me.favoriteGenre;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{filter}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
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
    </div>
  );
};

export default Recommend;
