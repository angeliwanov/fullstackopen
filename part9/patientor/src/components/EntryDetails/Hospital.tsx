import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { List, ListItem, Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";

const Hospital = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
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
        {entry.date} <LocalHospitalIcon />
      </Typography>
      <Typography>
        <em>{entry.description}</em>
      </Typography>
      <Typography>
        Discharge: {entry.discharge.date} - {entry.discharge.criteria}
      </Typography>
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

export default Hospital;
