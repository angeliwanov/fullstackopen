import { useState } from "react";

const maxNum = (arr) => {
  let max = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[max]) {
      max = i;
    }
  }
  return max;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const mostVotes = maxNum(votes);

  const handleChangeAnecdote = () => {
    setSelected((s) => (s < anecdotes.length - 1 ? s + 1 : 0));
  };

  const handleVoting = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVoting}>vote</button>
      <button onClick={handleChangeAnecdote}>next anecdote</button>
      {votes[mostVotes] !== 0 ? (
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[mostVotes]}</p>
          <p>has {votes[mostVotes]}</p>
        </div>
      ) : (
        <h1>There are no votes</h1>
      )}
    </>
  );
};

export default App;
