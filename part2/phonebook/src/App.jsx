import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState("success");

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

  const showNotification = (message, state) => {
    setNotificationStatus(state);
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };

  const showSuccess = (message) => {
    showNotification(message, "success");
  };

  const showError = (message) => {
    showNotification(message, "error");
  };

  const resetForm = (personObject, action) => {
    setNewName("");
    setNewNumber("");
    showSuccess(`${action} ${personObject.name}`);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    let existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined && newNumber != undefined) {
      personService
        .update(existingPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.name !== returnedPerson.name ? person : returnedPerson,
            ),
          );
          resetForm(personObject, "Updated");
        })
        .catch((error) => {
          showError(error.response.data.error);
        });
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          resetForm(personObject, "Added");
        })
        .catch((error) => {
          showError(error.response.data.error);
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
      <Notification message={notificationMessage} status={notificationStatus} />
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
