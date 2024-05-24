import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getCountry = async (country) => {
  const res = await axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`
  );
  return res.data;
};

export default { getAll, getCountry };
