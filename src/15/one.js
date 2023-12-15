import { readInput } from "../utils/readInput.js";

const getHash = (value) =>
  value
    .split("")
    .map((l) => l.charCodeAt(0))
    .reduce((acc, a) => ((acc + a) * 17) % 256, 0);

const sumHashes = (data) =>
  data
    .replaceAll("\n", "")
    .split(",")
    .map(getHash)
    .reduce((acc, a) => acc + a, 0);

const data = await readInput();

const result = sumHashes(data);

console.log(result);
