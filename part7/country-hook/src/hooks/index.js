import axios from "axios";
import { useEffect } from "react";

export const useCountry = (name) => {
  useEffect(() => {
    async function fetch() {
      const response = await axios.get(`/api/name/${name}`);
      console.log(response.data);
      return response.data;
    }
    fetch();
  }, [name]);
};
