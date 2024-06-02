import axios from "axios";

const baseUrl = "/api/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleteNote = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, id);
  return res;
};

export default {
  getAll,
  create,
  update,
  deleteNote,
};