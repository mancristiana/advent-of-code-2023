import { readInput } from "../utils/readInput.js";

const countCardsWon = (row) => {
  const [winningNumbers, elfNumbers] = row
    .split(": ")[1]
    .split(" | ")
    .map((x) => x.split(" ").map(Number).filter(Boolean));

  return elfNumbers.reduce(
    (acc, number) => (winningNumbers.includes(number) ? acc + 1 : acc),
    0
  );
};

const sumPoints = (data) => {
  const rows = data.split("\n").slice(0, -1);

  const cardsWonArray = rows.map((row) => countCardsWon(row));
  const cardCount = rows.map(() => 1);

  cardsWonArray.forEach((cardsWon, index) => {
    Array.from({ length: cardsWon }).forEach((_, i) => {
      if (index + i + 1 >= cardCount.length) return;
      cardCount[index + i + 1] += cardCount[index];
    });
  });

  return cardCount.reduce((acc, cardCount) => acc + cardCount, 0);
};

const data = await readInput();

const result = sumPoints(data);

console.log(result);
