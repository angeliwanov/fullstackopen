import FavoriteIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { List, ListItem, Typography } from "@mui/material";
import { Diagnosis, HealthCheckEntry } from "../../types";

const HealthCheck = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
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
        {entry.date} <MonitorHeartIcon />
      </Typography>
      <Typography>
        <em>{entry.description}</em>
      </Typography>
      <Typography sx={{ display: "flex", alignContent: "center", gap: "10px" }}>
        Health rating:{" "}
        {entry.healthCheckRating === 0 ? (
          <FavoriteIcon sx={{ color: "green" }} />
        ) : entry.healthCheckRating === 1 ? (
          <FavoriteIcon sx={{ color: "yellow" }} />
        ) : entry.healthCheckRating === 2 ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <PriorityHighIcon sx={{ color: "red" }} />
        )}
      </Typography>
      <Typography>Diagnose by {entry.specialist}</Typography>
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

export default HealthCheck;
