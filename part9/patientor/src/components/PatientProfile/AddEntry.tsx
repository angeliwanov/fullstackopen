import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { SyntheticEvent, useState } from "react";
import {
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";

const entryTypes = ["Hospital", "OccupationalHealthcare", "HealthCheck"];

const healthChechRatings = [0, 1, 2, 3];

type AddEntryProps = {
  modalOpen: boolean;
  modalClose: (value: React.SetStateAction<boolean>) => void;
  error: string;
  addEntry: (object: EntryWithoutId) => Promise<void>;
  diagnoses: Diagnosis[];
};

const AddEntry = ({
  diagnoses,
  modalOpen,
  modalClose,
  error,
  addEntry,
}: AddEntryProps) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosis, setDiagnosis] = useState<string[]>([]);
  const [entryType, setEntryType] = useState("");
  const [discharge, setDischarge] = useState<HospitalEntry["discharge"] | null>(
    null
  );
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState<
    OccupationalHealthcareEntry["sickLeave"] | null
  >(null);
  const createEntry = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!date || !description || !specialist) return;
    const newEntry = {
      date,
      description,
      specialist,
      diagnosisCodes: diagnosis,
    };

    switch (entryType) {
      case "Hospital":
        if (!discharge) return;
        addEntry({
          ...newEntry,
          type: "Hospital",
          discharge,
        });
        break;
      case "OccupationalHealthcare":
        if (!employerName) return;
        addEntry({
          ...newEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: sickLeave ? sickLeave : { startDate: "", endDate: "" },
        });
        break;
      case "HealthCheck":
        if (!healthCheckRating) return;
        addEntry({
          ...newEntry,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      default:
        return;
    }

    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosis([]);
    setEntryType("");
    setDischarge(null);
    setEmployerName("");
    setSickLeave(null);
  };

  return (
    <Dialog fullWidth open={modalOpen} onClose={modalClose}>
      <DialogTitle align="center">Create New Entry</DialogTitle>
      <Divider />
      <form onSubmit={createEntry}>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          <Box>
            <InputLabel>Date:</InputLabel>
            <Input
              required
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Box>
          <Box>
            <InputLabel>Description:</InputLabel>
            <Input
              required
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box>
            <InputLabel>Specialist:</InputLabel>
            <Input
              fullWidth
              required
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </Box>
          <Box>
            <InputLabel id="diagnosis">Diagnosis Codes:</InputLabel>
            <Select
              multiple
              fullWidth
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value as string[])}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: string) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map((diag) => (
                <MenuItem key={diag.code} value={diag.code}>
                  {diag.code}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <InputLabel>Entry Type</InputLabel>
            <Select
              required
              fullWidth
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
            >
              {entryTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {entryType === "Hospital" && (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <InputLabel>Discharge:</InputLabel>
              <Box
                sx={{
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <InputLabel>Date:</InputLabel>
                <Input
                  required
                  type="date"
                  fullWidth
                  onChange={(e) =>
                    setDischarge({
                      date: e.target.value,
                      criteria: discharge ? discharge.criteria : "",
                    })
                  }
                />
                <InputLabel>Criteria:</InputLabel>
                <Input
                  required
                  fullWidth
                  onChange={(e) =>
                    setDischarge({
                      date: discharge ? discharge.date : "",
                      criteria: e.target.value,
                    })
                  }
                />
              </Box>
            </Box>
          )}
          {entryType === "OccupationalHealthcare" && (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Box>
                <InputLabel>Employer Name:</InputLabel>
                <Input
                  fullWidth
                  required
                  onChange={(e) => setEmployerName(e.target.value)}
                />
              </Box>
              <InputLabel>Sick Leave:</InputLabel>
              <Box
                sx={{
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box>
                  <InputLabel>Start Date:</InputLabel>
                  <Input
                    type="date"
                    fullWidth
                    onChange={(e) =>
                      setSickLeave({
                        startDate: e.target.value,
                        endDate: sickLeave ? sickLeave.endDate : "",
                      })
                    }
                  />
                </Box>
                <Box>
                  <InputLabel>End Date:</InputLabel>
                  <Input
                    type="date"
                    fullWidth
                    onChange={(e) =>
                      setSickLeave({
                        startDate: sickLeave ? sickLeave.startDate : "",
                        endDate: e.target.value,
                      })
                    }
                  />
                </Box>
              </Box>
            </Box>
          )}
          {entryType === "HealthCheck" && (
            <Box>
              <InputLabel>HealthCheck</InputLabel>
              <Select
                fullWidth
                value={healthCheckRating}
                onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              >
                {healthChechRatings.map((rating) => (
                  <MenuItem value={rating}>{rating}</MenuItem>
                ))}
              </Select>
            </Box>
          )}
          <Button type="submit" variant="contained" onClick={() => addEntry}>
            Create
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddEntry;
