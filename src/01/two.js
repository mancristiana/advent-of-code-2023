import { parse } from "path";
import { readInput } from "../utils/readInput.js";

const spelledDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const matchToDigit = (match) => {
  if (spelledDigits.includes(match)) {
    return spelledDigits.indexOf(match) + 1;
  }
  return match;
};

const getCalibrationValue = (row) => {
  const regExp = new RegExp(`(?=(\\d|${spelledDigits.join("|")}))`, "g");
  const matches = [...row.matchAll(regExp)].map((match) => match[1]);

  const firstDigit = matchToDigit(matches[0]);
  const lastDigit = matchToDigit(matches[matches.length - 1]);

  return parseInt(`${firstDigit}${lastDigit}`, 10);
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
