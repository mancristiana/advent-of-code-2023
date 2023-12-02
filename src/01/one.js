import { readInput } from "../utils/readInput.js";

const getCalibrationValue = (row) => {
  const digits = row.replace(/\D/g, "");
  const firstDigit = digits[0];
  const lastDigit = digits[digits.length - 1];
  return parseInt(`${firstDigit}${lastDigit}`, 10)
};

const sumCalibrationValues = (data) =>
  data
    .split("\n")
    .slice(0, -1)
    .map((row) => getCalibrationValue(row))
    .reduce((acc, curr) => acc + curr, 0);

const data = await readInput();

const result = sumCalibrationValues(data);

console.log(result);
