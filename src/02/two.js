import { get } from "http";
import { readInput } from "../utils/readInput.js";

// const get

const splitCountColor = (colorCount) => {
  const [countString, color] = colorCount.trim(" ").split(" ");
  const count = parseInt(countString, 10);
  return { count, color };
};

const getMaxRGB = (row) => {
  const maxRGB = { red: 0, green: 0, blue: 0 };
  const [gameId, grabs] = row.split(":");

  grabs.split(";").map((grab) =>
    grab.split(",").map((countColor) => {
      const { count, color } = splitCountColor(countColor);
      maxRGB[color] = Math.max(maxRGB[color], count);
    })
  );
  return maxRGB;
};

const getCubePower = (row) => {
  const { red, green, blue } = getMaxRGB(row);
  return red * green * blue;
};

const sumPossibleGames = (data) =>
  data
    .split("\n")
    .slice(0, -1)
    .map((row) => getCubePower(row))
    .reduce((sum, cubePower) => sum + cubePower, 0);

const data = await readInput();

const result = sumPossibleGames(data);

console.log(result);
