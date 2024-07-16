import diagnoses from "../../data/diagnoses";
import { Dianosis } from "../types";

const getDiagnosis = (): Dianosis[] => {
  return diagnoses;
};

export default {
  getDiagnosis,
};
