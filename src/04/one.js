import { readInput } from "../utils/readInput.js";

const getPoints = (row) => {
  const [winningNumbers, elfNumbers] = row
    .split(": ")[1]
    .split(" | ")
    .map((x) => x.split(" ").map(Number).filter(Boolean));

  const matchingNumberCount = elfNumbers.reduce(
    (acc, number) => (winningNumbers.includes(number) ? acc + 1 : acc),
    0
  );

  return matchingNumberCount > 0 ? Math.pow(2, matchingNumberCount - 1) : 0;
};

const sumPoints = (data) =>
  data
    .split("\n")
    .slice(0, -1)
    .reduce((acc, row) => getPoints(row) + acc, 0);

const data = await readInput();

const result = sumPoints(data);

console.log(result);
