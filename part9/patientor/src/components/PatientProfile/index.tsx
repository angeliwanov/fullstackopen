import { Transgender } from "@mui/icons-material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import diagnosisService from "../../services/diagnoses";
import patientService from "../../services/patients";
import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import EntryDetails from "../EntryDetails";
import AddEntry from "./AddEntry";

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) patientService.getPatient(id).then((data) => setPatient(data));
    diagnosisService.getAllDiagnoses().then((data) => setDiagnoses(data));
  }, [id]);

  const addEntry = async (object: EntryWithoutId) => {
    try {
      if (id) {
        const newEntry = await patientService.createEntry(object, id);
        patient?.entries?.push(newEntry);
        setModalOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          setError(error.response?.data);
        } else {
          setError("AxiosError");
        }
      } else {
        setError("Unknown Error");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  if (!patient || !diagnoses)
    return (
      <Typography variant="h4" align="center">
        Patient not found.
      </Typography>
    );

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          mt: "20px",
          mb: "10px",
        }}
      >
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <Transgender />
        )}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography variant="h5" sx={{ my: "10px" }}>
        Entries
      </Typography>
      {patient?.entries?.map((entry) => {
        return <EntryDetails entry={entry} diagnoses={diagnoses} />;
      })}
      <AddEntry
        modalOpen={modalOpen}
        modalClose={() => setModalOpen(false)}
        error={error}
        addEntry={addEntry}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => setModalOpen(!modalOpen)}>
        Add entry
      </Button>
    </div>
  );
};

export default PatientProfile;
