import { readInput } from "../utils/readInput.js";

const rowToNumbers = (row) =>
  row.split(":")[1].split(" ").filter(Boolean).map(Number);

const calculateDistance = (time, charge) => charge * (time - charge);

const getCharges = (time) => Array.from({ length: time - 1 }, (_, i) => i + 1);

const countWins = (time, distance) =>
  getCharges(time)
    .map((charge) => calculateDistance(time, charge))
    .filter((d) => d > distance).length;

const solve = (data) => {
  const [times, distances] = data.split("\n").slice(0, -1).map(rowToNumbers);
  return times.reduce((multiply, time, index) => countWins(time, distances[index]) * multiply, 1);
};

const data = await readInput();

const result = solve(data);

console.log(result);
