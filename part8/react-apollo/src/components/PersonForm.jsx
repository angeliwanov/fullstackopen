import { useMutation } from "@apollo/client";
import { useState } from "react";
import { updateCache } from "../App";
import { ALL_PERSONS, CREATE_PERSON } from "../queries";

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      const message = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(message);
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson);
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        phone: phone.length > 0 ? phone : undefined,
        street,
        city,
      },
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          phone{" "}
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          street{" "}
          <input value={street} onChange={(e) => setStreet(e.target.value)} />
        </div>
        <div>
          city <input value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
