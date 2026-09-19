import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import countryService from "./services/countries";

const App = () => {
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.all().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value.toLowerCase());
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter),
  );

  return (
    <div>
      <label>find countries</label>
      <input value={countryFilter} onChange={handleCountryFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
