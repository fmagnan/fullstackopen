import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [persons, setPersons] = useState([]);

  const [search, setSearch] = useState("");

  const personsToShow = persons.filter(
    (element) =>
      element.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      search === "",
  );

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    let existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined && newNumber != undefined) {
      if (
        !confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        return;
      }
      personService.update(existingPerson.id, personObject).then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.name !== returnedPerson.name ? person : returnedPerson,
          ),
        );
        setNewName("");
        setNewNumber("");
      });
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const deletePerson = (personObject) => {
    if (!window.confirm(`Delete ${personObject.name}?`)) {
      return;
    }
    personService.remove(personObject.id).then(() => {
      setPersons(persons.filter((person) => person.id !== personObject.id));
    });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Filter search={search} handler={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        submit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </>
  );
};

export default App;
