export const parseArgsExerciseCalc = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  let i = 2;
  while (args[i]) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values are not numbers!");
    }
    i++;
  }

  return {
    target: Number(args[2]),
    actual: args.slice(3).map((i) => Number(i)),
  };
};

export const processArgsBmiCalc = (args: string[]) => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values are not numbers!");
  }
};

export const toNumber = (val: unknown): number => {
  if (!isNaN(Number(val))) return Number(val);
  else throw new Error("malformatted parameters");
};
