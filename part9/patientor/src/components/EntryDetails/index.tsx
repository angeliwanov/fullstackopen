import { Diagnosis, Entry } from "../../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    default:
      return null;
  }
};

export default EntryDetails;
