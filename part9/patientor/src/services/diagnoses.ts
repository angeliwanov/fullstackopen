import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getAllDiagnoses = async () => {
  const result = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return result.data;
};

export default { getAllDiagnoses };
