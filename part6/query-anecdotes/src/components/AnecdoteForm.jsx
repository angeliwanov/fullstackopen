import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNew } from "../requests";
import { useNotificationDispatch } from "../services/useNotification";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
    onError: (err) => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `Error: ${err.response.data.error}`,
      });
      setTimeout(() => {
        dispatch({
          type: "SET_NOTIFICATION",
          payload: "",
        });
      }, 2000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log(content);
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
