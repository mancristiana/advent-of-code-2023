import { readInput } from "../utils/readInput.js";

const getGalaxies = (matrix) =>
  matrix.reduce((galaxies, row, y) => {
    row.forEach((element, x) => {
      if (element === "#") {
        galaxies.push({ x, y });
      }
    });
    return galaxies;
  }, []);

const getEmptyRows = (matrix) =>
  matrix.reduce((rows, row, y) => {
    if (row.every((element) => element === ".")) {
      rows.push(y);
    }
    return rows;
  }, []);

const getEmptyCols = (matrix) =>
  Array.from({ length: matrix[0].length }, (_, i) => i).filter((i) =>
    matrix.every((row) => row[i] === "."),
  );

const solve = (data) => {
  const matrix = data
    .split("\n")
    .slice(0, -1)
    .map((row) => row.split(""));

  const galaxies = getGalaxies(matrix);
  const emptyRows = getEmptyRows(matrix);
  const emptyCols = getEmptyCols(matrix);

  const expandedGalaxies = galaxies.map(({ x, y }) => ({
    x: x + emptyCols.filter((col) => col < x).length * 999999,
    y: y + emptyRows.filter((row) => row < y).length * 999999,
  }));

  const galaxyPairs = expandedGalaxies.reduce(
    (pairs, galaxyA, i) => [
      ...pairs,
      ...expandedGalaxies.slice(i + 1).map((galaxyB) => ({ galaxyA, galaxyB })),
    ],
    [],
  );

  return galaxyPairs.reduce((sum, { galaxyA, galaxyB }) => {
    const distance =
      Math.abs(galaxyA.x - galaxyB.x) + Math.abs(galaxyA.y - galaxyB.y);
    return sum + distance;
  }, 0);
};
const data = await readInput();

const result = solve(data);

console.log(result);
