import { readInput } from "../utils/readInput.js";

const isDigit = (char) => /\d/.test(char);
const isSymbol = (char) => /[^.\d]/.test(char);

const isNeighborIndex = (matrix, row, col) => {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
};

const getNeighbors = (matrix, row, col) => {
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
          return matrix[newRow][newCol];
        }
      })
    )
    .filter(Boolean);
};

const hasSymbolNeighbor = (matrix, rowIndex, cellIndex) =>
  getNeighbors(matrix, rowIndex, cellIndex).some((neighbor) =>
    isSymbol(neighbor)
  );

const sumEngineParts = (data) => {
  const matrix = data
    .split("\n")
    .slice(0, -1)
    .map((row) => row.split(""));

  let sum = 0;

  matrix.forEach((row, rowIndex) => {
    let numberAsString = "";
    let isEnginePart = false;

    row.forEach((cell, cellIndex) => {
      const isLastCell = cellIndex === row.length - 1;
      const isDigitCell = isDigit(cell);

      if (isDigitCell) {
        numberAsString = numberAsString + cell;
        isEnginePart =
          isEnginePart || hasSymbolNeighbor(matrix, rowIndex, cellIndex);
      }
      
      if (isLastCell || !isDigitCell) {
        if (isEnginePart) {
          sum += parseInt(numberAsString, 10);
        }
        numberAsString = "";
        isEnginePart = false;
      }
    });
  });

  return sum;
};

const data = await readInput();

const result = sumEngineParts(data);

console.log(result);
