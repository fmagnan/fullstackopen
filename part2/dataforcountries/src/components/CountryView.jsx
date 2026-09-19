import Weather from "../components/Weather";
import Language from "./Language";

const CountryView = ({ country, weather }) => {
  let languages = [];
  for (var key in country.languages) {
    languages.push(country.languages[key]);
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map((item) => (
          <Language key={item} language={item} />
        ))}
      </ul>
      <div>
        <img src={country.flags.png} />
      </div>
      <Weather capital={country.capital} weather={weather} />
    </div>
  );
};

export default CountryView;
