import Countries from "./Countries";
import CountryView from "./CountryView";

const MainContent = ({ countries, selectedCountry, showCountry }) => {
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
    <div>
      <Countries countries={countries} showCountry={showCountry} />
    </div>
  );
};

export default MainContent;
