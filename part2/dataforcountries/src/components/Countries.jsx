import CountryListItem from "./CountryListItem";
import CountryView from "./CountryView";

const Countries = ({ countries, selectedCountry, setSelectedCountry }) => {
  const showCountry = (country) => {
    setSelectedCountry(country);
  };

  if (countries.length > 10) {
    return (
      <div className="error">Too many matches, specify another filter</div>
    );
  }
  if (countries.length === 1) {
    return (
      <>
        <CountryView country={countries[0]} />
      </>
    );
  }
  if (selectedCountry !== null) {
    return (
      <>
        <CountryView country={selectedCountry} />
      </>
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
