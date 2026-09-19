import Countries from "./Countries";
import CountryView from "./CountryView";

const MainContent = ({ countries, selectedCountry, showCountry, weather }) => {
  if (selectedCountry !== null) {
    return (
      <>
        <CountryView country={selectedCountry} weather={weather}/>
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
