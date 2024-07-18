import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveDataOfPatients());
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    res.json(patientService.getPatientById(id));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/", (req, res) => {
  try {
    const patientId = req.params.id;
    const entry = toNewEntry(req.body);
    res.json(patientService.addEntry(entry, patientId));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
