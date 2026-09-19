import Language from "./Language";

const DetailedCountry = ({ country }) => {
  let languages = [];
  for (var key in country.languages) {
    languages.push(country.languages[key]);
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map((item) => (
          <Language key={item} language={item} />
        ))}
      </ul>
      <div>
        <img src={country.flags.png} />
      </div>
    </div>
  );
};

export default DetailedCountry;
