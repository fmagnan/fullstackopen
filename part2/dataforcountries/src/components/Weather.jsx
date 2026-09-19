const Weather = ({ capital, weather }) => {
  if (weather === null) {
    return <></>;
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</div>
      <div>
        <img
          src={`https://openweathermap.org/payload/api/media/file/${weather?.weather?.[0]?.icon}.png`}
        />
      </div>
      <div>Wind: {weather?.wind?.speed} m/s</div>
    </div>
  );
};

export default Weather;
