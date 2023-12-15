import { readInput } from "../utils/readInput.js";

const getHash = (value) =>
  value
    .split("")
    .map((l) => l.charCodeAt(0))
    .reduce((acc, a) => ((acc + a) * 17) % 256, 0);

const parseInstruction = (value) => {
  if (value.includes("=")) {
    const [label, focalLength] = value.split("=");
    return { operation: "=", label, focalLength, box: getHash(label) };
  }

  const label = value.slice(0, -1);
  return { operation: "-", label, box: getHash(label) };
};

const calculateFocusingPower = (boxNumber, slotNumber, focalLength) =>
  (1 + boxNumber) * (1 + slotNumber) * focalLength;

const sumFocusingPowerForBox = (lenses, boxNumber) =>
  lenses.reduce(
    (sum, { focalLength }, slotNumber) =>
      sum + calculateFocusingPower(boxNumber, slotNumber, focalLength),
    0,
  );

const solve = (data) => {
  const boxes = Array.from({ length: 256 }, () => []);
  data
    .replaceAll("\n", "")
    .split(",")
    .map(parseInstruction)
    .forEach(({ operation, label, focalLength, box }) => {
      if (operation === "=") {
        const existingLens = boxes[box].find((l) => l.label === label);
        if (existingLens) {
          existingLens.focalLength = focalLength;
        } else {
          boxes[box].push({ label, focalLength });
        }
      } else {
        boxes[box] = boxes[box].filter((l) => l.label !== label);
      }
    });

  return boxes.reduce(
    (acc, box, boxNumber) => acc + sumFocusingPowerForBox(box, boxNumber),
    0,
  );
};

const data = await readInput();

const result = solve(data);

console.log(result);
