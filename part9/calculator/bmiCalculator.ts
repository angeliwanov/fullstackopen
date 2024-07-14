import { processArgsBmiCalc } from "./utils";

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  switch (true) {
    case bmi > 1 && bmi < 16:
      return "Severe Thinness";
    case bmi > 16 && bmi < 17:
      return "Moderate Thinness";
    case bmi > 17 && bmi < 18.5:
      return "Mild Thinness";
    case bmi > 18.5 && bmi < 25:
      return "Normal";
    case bmi > 25 && bmi < 30:
      return "Overweight";
    case bmi > 30 && bmi < 35:
      return "Obese Class I";
    case bmi > 35 && bmi < 40:
      return "Obese Class II";
    case bmi > 40 && bmi < 50:
      return "Obese Class III";
    default:
      throw new Error("incorrect inputs");
  }
};

try {
  const { height, weight } = processArgsBmiCalc(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
