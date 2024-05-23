import { useEffect, useState } from "react";
import Form from "./components/Form";
import Persons from "./components/Persons";
import SearchBar from "./components/SearchBar";
import services from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const { getAll, createPerson, deletePerson, updatePerson } = services;
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
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

  const addPerson = async (event) => {
    event.preventDefault();
    if (!newName || !newNumber) {
      alert(`Both fields are required`);
      return;
    }

    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        try {
          const person = persons.find((person) => person.name === newName);
          const updatedPerson = await updatePerson(person.id, {
            ...person,
            number: newNumber,
          });
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : updatedPerson))
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const newPerson = await createPerson({
        name: newName,
        number: newNumber,
      });
      setPersons(persons.concat(newPerson));
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
        console.log(error);
      }
    }
  };
  return (
    <>
      <h2>Phonebook</h2>
      <SearchBar value={search} onChange={handleSearch} />
      <h2>Add a number</h2>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={!search ? persons : filteredPersons}
        handleDelete={handleDelete}
      />
      <div></div>
    </>
  );
};

export default App;
