import { useEffect, useState } from "react";
import MainContent from "./components/MainContent";
import countryService from "./services/countries";

const App = () => {
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.all().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value.toLowerCase());
    setSelectedCountry(null);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter),
  );

  const showCountry = (country) => {
    setSelectedCountry(country);
  };

  const countryToShow =
    countriesToShow.length === 1 ? countriesToShow[0] : selectedCountry;

  return (
    <div>
      <label>find countries</label>
      <input value={countryFilter} onChange={handleCountryFilterChange} />
      <MainContent
        countries={countriesToShow}
        selectedCountry={countryToShow}
        showCountry={showCountry}
      />
    </div>
  );
};

export default App;
