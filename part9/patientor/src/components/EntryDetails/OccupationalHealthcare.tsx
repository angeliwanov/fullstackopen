import MenuBookIcon from "@mui/icons-material/MenuBook";
import { List, ListItem, Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcare = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "10px 10px 0px 10px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <Typography sx={{ display: "flex", alignContent: "center", gap: "10px" }}>
        {entry.date} <MenuBookIcon />
      </Typography>
      <Typography>
        <em>{entry.description}</em>
      </Typography>
      <Typography>employer: {entry.employerName}</Typography>
      {entry.sickLeave && (
        <Typography>
          Sick leave: from {entry.sickLeave?.startDate} to{" "}
          {entry.sickLeave?.endDate}
        </Typography>
      )}
      <Typography>Diagnoses:</Typography>
      <List sx={{ listStyleType: "disc", ml: "20px" }}>
        {entry.diagnosisCodes?.map((el) => (
          <ListItem sx={{ display: "list-item", py: "0" }}>
            <Typography>
              {el} - {diagnoses?.find((d) => d.code === el)?.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OccupationalHealthcare;
