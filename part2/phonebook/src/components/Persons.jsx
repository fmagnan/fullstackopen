const Person = ({ name, number, deletePerson }) => {
  return (
    <li>
      {name} : {number}&nbsp;
      <button onClick={deletePerson}>delete</button>
    </li>
  );
};

const Persons = ({ persons, deletePerson }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            deletePerson={() => deletePerson(person)}
          />
        ))}
      </ul>
    </>
  );
};

export default Persons;
