import Country from "./Country";
import Language from "./Language";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div className="error">Too many matches, specify another filter</div>
    );
  }
  if (countries.length === 1) {
    let languages = [];

    for (var key in countries[0].languages) {
      languages.push(countries[0].languages[key]);
    }

    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        <div>Capital {countries[0].capital}</div>
        <div>Area {countries[0].area}</div>
        <h2>Languages</h2>
        <ul>
          {languages.map((item) => (
            <Language key={item} language={item} />
          ))}
        </ul>
        <div>
          <img src={countries[0].flags.png} />
        </div>
      </div>
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
