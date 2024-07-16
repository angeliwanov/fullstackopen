import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import { NewPatient, NonSensitiveDataOfPatients, Patient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitiveDataOfPatients = (): NonSensitiveDataOfPatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient) => {
  const newEntry = {
    ...entry,
    id: uuidv4(),
  };
  patients.push(newEntry);
  console.log(patients);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitiveDataOfPatients,
  addPatient,
};
