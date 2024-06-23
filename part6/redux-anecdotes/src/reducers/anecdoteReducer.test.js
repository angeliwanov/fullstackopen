import { describe, expect } from "@jest/globals";
import deepFreeze from "deep-freeze";
import anecdoteReducer from "./anecdoteReducer";

const initialState = [
  {
    content: "anecdote1",
    id: 1,
    votes: 0,
  },
  {
    content: "anecdote2",
    id: 2,
    votes: 0,
  },
];
describe("anecdoteReducer", () => {
  test("votes are incremented", () => {
    const action = {
      type: "anecdotes/vote",
      payload: 1,
    };
    const state = initialState;
    deepFreeze(state);

    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual([
      {
        content: "anecdote1",
        id: 1,
        votes: 1,
      },
      state[1],
    ]);
  });

  test("new anecdote is created", () => {
    const action = {
      type: "anecdotes/createAnecdote",
      payload: "anecdote3",
    };
    const state = initialState;
    deepFreeze(state);

    const newState = anecdoteReducer(state, action);
    expect(newState.length).toEqual(3);
    expect(newState[2].content).toEqual("anecdote3");
  });
});
