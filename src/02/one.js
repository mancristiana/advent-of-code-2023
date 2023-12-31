import { readInput } from "../utils/readInput.js";

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

const isPossibleGame = (row) => {
  const { red, green, blue } = getMaxRGB(row);
  return red <= 12 && green <= 13 && blue <= 14;
};

const sumPossibleGames = (data) =>
  data
    .split("\n")
    .slice(0, -1)
    .map((row) => isPossibleGame(row))
    .reduce((sum, isPossible, index) => sum + (isPossible ? index + 1 : 0), 0);

const data = await readInput();

const result = sumPossibleGames(data);

console.log(result);
