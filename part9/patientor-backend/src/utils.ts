import {
  Diagnosis,
  Gender,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../src/types";
import { EntryWithoutId, NewPatient } from "./types";

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

const parseNumber = (arg: unknown): number => {
  if (!arg || isNaN(Number(arg))) {
    throw new Error("Incorrect or missing parameter");
  }
  return Number(arg);
};

const parseDischarge = (arg: unknown): HospitalEntry["discharge"] => {
  if (
    !arg ||
    typeof arg !== "object" ||
    !("date" in arg) ||
    !("criteria" in arg) ||
    !isString(arg.criteria) ||
    !isString(arg.date) ||
    !isDate(arg.date)
  ) {
    throw new Error("Incorrect or missing paramenter");
  }
  return arg as HospitalEntry["discharge"];
};

const parseSickLeave = (
  arg: unknown
): OccupationalHealthcareEntry["sickLeave"] => {
  if (
    !arg ||
    typeof arg !== "object" ||
    !("startDate" in arg) ||
    !("endDate" in arg) ||
    !isString(arg.startDate) ||
    !isString(arg.endDate) ||
    !isDate(arg.startDate) ||
    !isDate(arg.endDate)
  ) {
    throw new Error("Incorrect or missing paramenter");
  }
  return arg as OccupationalHealthcareEntry["sickLeave"];
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const newEntry = {
      description: parseArg(object.description),
      date: parseDate(object.date),
      specialist: parseArg(object.specialist),
      diagnosisCodes: !("diagnosisCodes" in object)
        ? ([] as Array<Diagnosis["code"]>)
        : (object.diagnosisCodes as Array<Diagnosis["code"]>),
    };

    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          return {
            ...newEntry,
            type: "HealthCheck",
            healthCheckRating: parseNumber(object.healthCheckRating),
          };
        }
        throw new Error("Incorrect or missing parameter");
      case "Hospital":
        if ("discharge" in object) {
          return {
            ...newEntry,
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };
        }
        throw new Error("Incorrect or Missing parements");
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          return {
            ...newEntry,
            type: "OccupationalHealthcare",
            employerName: parseArg(object.employerName),
            sickLeave: !("sickLeave" in object)
              ? ({} as OccupationalHealthcareEntry["sickLeave"])
              : parseSickLeave(object.sickLeave),
          };
        }
        throw new Error("Incorrect or missing parameter");
      default:
        throw new Error("Incorrect or missing parameter for entry type");
    }
  }
  throw new Error("Incorrect data: some fields are missing.");
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
