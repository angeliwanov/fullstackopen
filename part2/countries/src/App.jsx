import { useEffect, useState } from "react";
import Country from "./components/Country";
import countries from "./services/countries";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      if (search === "") {
        setData([]);
        return;
      }

      const initialData = await countries.getAll();
      setData(
        initialData.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    fetchCountries();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShow = (ctr) => {
    setShow(ctr);
  };

  return (
    <div>
      <label>find countries </label>
      <input onChange={handleSearch} />
      <div>
        {!show &&
          data.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleShow(country)}>show</button>
            </li>
          ))}

        {show && <Country country={show} goBack={handleShow} />}
      </div>
    </div>
  );
};

export default App;
