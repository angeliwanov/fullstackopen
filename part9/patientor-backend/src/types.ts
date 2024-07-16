export interface Dianosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NonSensitiveDataOfPatients = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
