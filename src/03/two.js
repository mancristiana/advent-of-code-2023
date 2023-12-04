import { readInput } from "../utils/readInput.js";

const isDigit = (char) => /\d/.test(char);
const isGear = (char) => /\*/.test(char);

const isNeighborIndex = (matrix, row, col) => {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
};

const getNeighborsCoords = (matrix, row, col) => {
  const offsets = [-1, 0, 1];
  return offsets
    .flatMap((offsetRow) =>
      offsets.flatMap((offsetCol) => {
        const newRow = row + offsetRow;
        const newCol = col + offsetCol;
        if (
          isNeighborIndex(matrix, newRow, newCol) &&
          (offsetCol !== 0 || offsetRow !== 0)
        ) {
          return { row: newRow, col: newCol };
        }
      })
    )
    .filter(Boolean);
};

const getNeighborGearCoords = (matrix, rowIndex, cellIndex) => {
  const gearCoords = [];
  getNeighborsCoords(matrix, rowIndex, cellIndex).forEach(({ row, col }) => {
    if (isGear(matrix[row][col])) {
      gearCoords.push(`[${row}][${col}]`);
    }
  });
  return gearCoords;
};

const buildGearHashMap = (data) => {
  const gearHashMap = {};

  const addNumberToGearHashMap = (gear, number) => {
    if (gearHashMap[gear]) {
      gearHashMap[gear].push(number);
    } else {
      gearHashMap[gear] = [number];
    }
  };

  const matrix = data
    .split("\n")
    .slice(0, -1)
    .map((row) => row.split(""));

  matrix.forEach((row, rowIndex) => {
    let numberAsString = "";
    let gearCoords = [];

    row.forEach((cell, cellIndex) => {
      const isLastCell = cellIndex === row.length - 1;
      const isDigitCell = isDigit(cell);

      if (isDigitCell) {
        numberAsString = numberAsString + cell;
        getNeighborGearCoords(matrix, rowIndex, cellIndex).forEach((coords) => {
          if (!gearCoords.includes(coords)) {
            gearCoords.push(coords);
          }
        });
      }

      if (isLastCell || !isDigitCell) {
        if (gearCoords.length > 0) {
          gearCoords.forEach((gear) =>
            addNumberToGearHashMap(gear, parseInt(numberAsString, 10))
          );
        }
        numberAsString = "";
        gearCoords = [];
      }
    });
  });
  return gearHashMap;
};

const sumGearRatios = (data) => {
  const gearHashMap = buildGearHashMap(data);
  const gearNumbers = Object.values(gearHashMap).filter((numbers) => numbers.length === 2 );
  return gearNumbers.reduce((sum, numbers) => sum + (numbers[0] * numbers[1]), 0);
};

const data = await readInput();

const result = sumGearRatios(data);

console.log(result);
