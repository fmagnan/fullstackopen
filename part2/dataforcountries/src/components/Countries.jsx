import CountryListItem from "./CountryListItem";

const Countries = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return (
      <div className="error">Too many matches, specify another filter</div>
    );
  }

  return (
    <ul>
      {countries.map((country) => (
        <CountryListItem
          key={country.cca3}
          country={country}
          showCountry={() => showCountry(country)}
        />
      ))}
    </ul>
  );
};

export default Countries;
