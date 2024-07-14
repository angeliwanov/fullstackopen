import { parseArgsExerciseCalc } from "./utils";

interface ExerciseTypes {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  actual: number[],
  target: number
): ExerciseTypes => {
  const periodLength = actual.length;
  const trainingDays = actual.filter((i) => i !== 0).length;
  const total = actual.reduce((acc, val) => acc + val, 0);
  const average = total / periodLength;
  const success = average >= target;
  const percentage = average / target;

  let rating: number;
  let ratingDescription: string;

  switch (true) {
    case percentage < 0.5:
      rating = 1;
      ratingDescription = "very bad";
      break;
    case percentage < 1:
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;
    case percentage > 1:
      rating = 3;
      ratingDescription = "excellent";
      break;
    default:
      throw new Error("incorrect inputs");
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, actual } = parseArgsExerciseCalc(process.argv);
  console.log(calculateExercises(actual, target));
} catch (error) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
