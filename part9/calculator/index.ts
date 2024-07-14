import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { toNumber } from "./utils";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;
    const h = toNumber(height);
    const w = toNumber(weight);
    const bmi = calculateBmi(h, w);
    res.send({ weight, height, bmi });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
  }
  return;
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target)
    res.status(400).send({ error: "parameters missing" });

  try {
    if (Array.isArray(daily_exercises)) {
      const actual = daily_exercises.map((i) => toNumber(i));
      const t = toNumber(target);
      const result = calculateExercises(actual, t);
      res.send(result);
    } else {
      res.status(400).send({ error: "malformatted parameters" });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
  }

  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
