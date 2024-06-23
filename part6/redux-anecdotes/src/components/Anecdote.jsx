import React from "react";
import { useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, disabled }) => {
  const dispatch = useDispatch();

  const addVote = (id) => {
    dispatch(vote(id));
    dispatch(sendNotification(`You voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(sendNotification(""));
    }, 5000);
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button disabled={disabled} onClick={() => addVote(anecdote.id)}>
          vote
        </button>
      </div>
    </div>
  );
};

export default Anecdote;
