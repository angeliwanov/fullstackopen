import cors from "cors";
import express from "express";
import dairyRouter from "./routes/diaries";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diaries", dairyRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
