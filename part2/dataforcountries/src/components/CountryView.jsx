import Language from "./Language";

const CountryView = ({ country }) => {
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
      <h2>Weather in {country.capital}</h2>
      <div>Temperature: foo</div>
      <div>
        <img
          src={`https://openweathermap.org/payload/api/media/file/04d.png`}
        />
      </div>
      <div>Wind: bar</div>
    </div>
  );
};

export default CountryView;
