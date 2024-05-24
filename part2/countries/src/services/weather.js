import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API;

const getWeather = async (city) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
  );

  return res.data;
};

export { getWeather };
