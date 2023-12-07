import { readInput } from "../utils/readInput.js";

const cards = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
const handTypesMap = ["11111", "2111", "221", "311", "32", "41", "5"];

const getHandTypeRank = (hand) => {
  const occurrenceMap = hand.reduce(
    (map, card) => ({ ...map, [card]: (map[card] || 0) + 1 }),
    {},
  );

  const countJokers = occurrenceMap["J"] || 0;
  delete occurrenceMap["J"];

  if (countJokers === 5) {
    return 6;
  }

  const handType = Object.values(occurrenceMap)
    .sort((a, b) => b - a)
    .map((count, index) => (index === 0 ? count + countJokers : count))
    .join("");

  return handTypesMap.indexOf(handType);
};

const rowToBidScore = (row) => {
  const [handPart, bidPart] = row.split(" ");
  const bid = Number(bidPart);
  const hand = handPart.split("");

  const handTypeRank = getHandTypeRank(hand);
  const handInBase13 = hand
    .map((card) => cards.indexOf(card).toString(13))
    .join("");

  const score = parseInt(`${handTypeRank}${handInBase13}`, 13);

  return {
    bid,
    score,
  };
};

const solve = (data) =>
  data
    .split("\n")
    .slice(0, -1)
    .map(rowToBidScore)
    .sort((a, b) => a.score - b.score)
    .reduce((sum, { bid }, index) => sum + bid * (index + 1), 0);

const data = await readInput();

const result = solve(data);

console.log(result);
