import { useEffect, useState } from "react";
import countries from "../services/countries";
import { getWeather } from "../services/weather";

const Country = ({ country, goBack }) => {
  const [data, setData] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      const intitialData = await countries.getCountry(country);
      const weatherAPI = await getWeather(country.capital[0]);
      setWeather(weatherAPI);
      setData(intitialData);
    }
    fetchCountry();
  }, [country]);

  if (!data) return;

  return (
    <div>
      <button
        onClick={() => {
          goBack(null);
        }}
      >
        go back
      </button>
      <h1>{data.name.common}</h1>
      <p>Capital: {data.capital[0]}</p>
      <p>Area: {data.area}</p>
      <h3>Languages: </h3>
      <ul>
        {Object.values(data.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img
        src={data.flags.svg}
        style={{
          width: "100%",
          maxWidth: 200,
        }}
      />
      <h3>Weather in {country.capital[0]}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        style={{
          width: "100%",
          maxWidth: 100,
        }}
      />
      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Country;
