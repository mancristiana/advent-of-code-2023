import { readInput } from "../utils/readInput.js";

const getMapMatrix = (almanacMap) => {
  const rows = almanacMap.split("\n").slice(1).filter(Boolean);
  return rows.map((row) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = row
      .split(" ")
      .map(Number);

    return { destinationRangeStart, sourceRangeStart, rangeLength };
  });
};

const getSeedsFromAlmanac = (almanacSeeds) =>
  almanacSeeds.replace("seeds: ", "").split(" ").map(Number);

const findDestinationId = (mapMatrix, sourceId) => {
  const found = mapMatrix.find(
    ({ sourceRangeStart, rangeLength }) =>
      sourceRangeStart <= sourceId && sourceId < sourceRangeStart + rangeLength
  );

  if (!found) return sourceId;

  const { destinationRangeStart, sourceRangeStart } = found;

  return destinationRangeStart + (sourceId - sourceRangeStart);
};

const getLocationId = (mapMatrices, seed) =>
  mapMatrices.reduce(
    (sourceId, mapMatrix) => findDestinationId(mapMatrix, sourceId),
    seed
  );

const solve = (data) => {
  const [almanacSeeds, ...almanacMaps] = data.split("\n\n");
  const seeds = getSeedsFromAlmanac(almanacSeeds);
  const mapMatrices = almanacMaps.map((am) => getMapMatrix(am));

  return Math.min(...seeds.map((seed) => getLocationId(mapMatrices, seed)));
};

const almanac = await readInput();

const result = solve(almanac);

console.log(result);
