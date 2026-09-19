import Countries from "./Countries";
import CountryView from "./CountryView";

const MainContent = ({ countries, selectedCountry, showCountry }) => {
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
