import React from "react";
import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter
      ? anecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
  );

  const disabled = useSelector(({ notification }) =>
    notification ? true : false
  );

  return (
    <>
      {anecdotes
        .slice()
        .sort((a, b) => {
          return b.votes - a.votes;
        })
        .map((anecdote) => (
          <Anecdote disabled={disabled} key={anecdote.id} anecdote={anecdote} />
        ))}
    </>
  );
};

export default AnecdoteList;
