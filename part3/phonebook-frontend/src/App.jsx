import { useEffect, useMemo, useState } from "react";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import SearchBar from "./components/SearchBar";
import services from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const { getAll, createPerson, deletePerson, updatePerson } = services;
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const filteredPersons = useMemo(
    () =>
      persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, persons]
  );

  useEffect(() => {
    async function fetchData() {
      const initialPersons = await getAll();
      setPersons(initialPersons);
    }
    fetchData();
  }, [getAll]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = async (event) => {
    setSearch(event.target.value);
  };

  const handleUpdate = async (personsServer) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      try {
        const person = personsServer.find((person) => person.name === newName);
        const updatedPerson = await updatePerson(person.id, {
          ...person,
          number: newNumber,
        });
        setPersons(
          personsServer.map((person) =>
            person.name === newName ? updatedPerson : person
          )
        );
        setMessage(`${person.name}'s details have been updated`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (error) {
        setError(true);
        setMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setError(false);
          setMessage(null);
        }, 5000);
      }
    } else {
      setPersons(personsServer);
    }
  };

  const handleCreatePerson = async (event) => {
    event.preventDefault();

    const personsServer = await getAll();

    if (personsServer.find((person) => person.name === newName)) {
      handleUpdate(personsServer);
    } else {
      try {
        const newPerson = await createPerson({
          name: newName,
          number: newNumber,
        });
        setPersons(persons.concat(newPerson));
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (error) {
        setError(true);
        setMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setError(false);
          setMessage(null);
        }, 5000);
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete?")) {
      try {
        await deletePerson(id);
        setPersons((p) => p.filter((i) => i.id !== id));
      } catch (error) {
        const person = persons.find((p) => p.id === id);
        setPersons((persons) => persons.filter((person) => person.id !== id));
        setError(true);
        setMessage(
          `Information of ${person.name} has already been removed from server`
        );
        setTimeout(() => {
          setMessage(null);
          setError(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <SearchBar value={search} onChange={handleSearch} />
      <h2>Add a number</h2>
      <Form
        addPerson={handleCreatePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
      <div></div>
    </>
  );
};

export default App;
