import { readInput } from "../utils/readInput.js";

const rowToNumbers = (row) => Number(row.split(":")[1].replaceAll(" ", ""))

const calculateDistance = (time, charge) => charge * (time - charge);

const getCharges = (time) => Array.from({ length: time - 1 }, (_, i) => i + 1);

const countWins = (time, distance) =>
  getCharges(time)
    .map((charge) => calculateDistance(time, charge))
    .filter((d) => d > distance).length;

const solve = (data) => {
  const [time, distance] = data.split("\n").slice(0, -1).map(rowToNumbers);
  return countWins(time, distance);
};

const data = await readInput();

const result = solve(data);

console.log(result);
