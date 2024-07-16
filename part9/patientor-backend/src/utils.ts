import { Gender } from "../data/patients";
import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseArg = (arg: unknown): string => {
  if (!arg || !isString(arg)) {
    throw new Error("Incorrect or missing parameter");
  }
  return arg;
};

const isGender = (gender: unknown): gender is Gender => {
  return Object.values(Gender).includes(gender as Gender);
};

const parseGender = (arg: unknown): string => {
  if (!arg || !isString(arg) || !isGender(arg)) {
    throw new Error("Incorrect or missing parameter for gender");
  }
  return arg;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing parameter for date");
  }
  return date;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseArg(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseArg(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseArg(object.occupation),
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing.");
};
