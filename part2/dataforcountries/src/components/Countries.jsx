import Country from "./Country";
import DetailedCountry from "./DetailedCountry";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div className="error">Too many matches, specify another filter</div>
    );
  }
  if (countries.length === 1) {
    return (
      <>
        <DetailedCountry country={countries[0]} />
      </>
    );
  }
  return (
    <ul>
      {countries.map((country) => (
        <Country key={country.cca3} country={country} />
      ))}
    </ul>
  );
};

export default Countries;
