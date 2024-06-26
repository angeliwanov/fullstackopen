const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>
        has {anecdote.votes} votes{" "}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </p>
      <p>
        for more infor see{" "}
        <a href={anecdote.info} target="_blank" rel="noreferrer">
          {anecdote.info}
        </a>
      </p>
    </div>
  );
};

export default Anecdote;
