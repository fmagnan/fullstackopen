const Country = ({ country, showCountry }) => {
  return (
    <li>
      <span>{country.name.common}</span>
      <button onClick={showCountry}>Show</button>
    </li>
  );
};

export default Country;
