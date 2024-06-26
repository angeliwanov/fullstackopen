import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateNote = async (noteToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${noteToUpdate.id}`,
    noteToUpdate
  );
  return response.data;
};

export default { getAll, createNew, updateNote };
