import axios from "axios";

const baseUrl = "/api/persons";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createPerson = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

const updatePerson = async (id, updatedPerson) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
  return response.data;
};

export default { getAll, createPerson, deletePerson, updatePerson };
