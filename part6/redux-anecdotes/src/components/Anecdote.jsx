import React from "react";
import { useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, disabled }) => {
  const dispatch = useDispatch();

  const addVote = async () => {
    const anecdoteToUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    dispatch(increaseVote(anecdoteToUpdate));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 2));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button disabled={disabled} onClick={addVote}>
          vote
        </button>
      </div>
    </div>
  );
};

export default Anecdote;
