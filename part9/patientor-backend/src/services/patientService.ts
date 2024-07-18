import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitiveDataOfPatients,
  Patient,
} from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id) as Patient;

  return { ...patient };
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
  return newEntry;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const newEntry = { ...entry, id: uuidv4() };
  patients.map((patient) =>
    patient.id === patientId ? patient.entries?.push(newEntry) : patient
  );
  return newEntry;
};

export default {
  getPatients,
  getNonSensitiveDataOfPatients,
  addPatient,
  getPatientById,
  addEntry,
};
