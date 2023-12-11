import { readInput } from "../utils/readInput.js";

const toNode = (row) => {
  const match = /(?<node>\w+) = \((?<left>\w+), (?<right>\w+)\)/g.exec(row);
  const { node, left, right } = match.groups;
  return { node, left, right };
};

const solve = (data) => {
  const [instructionPart, nodePart] = data.split("\n\n");
  const instructions = instructionPart.split("");
  const nodes = nodePart.split("\n").slice(0, -1).map(toNode).reduce((map, {node, left, right}) => ({ ...map, [node]: {left, right} }), {});

  let currentNode = "AAA";
  let steps = 0;
  while (currentNode !== "ZZZ") {
    const { left, right } = nodes[currentNode];
    currentNode = instructions[steps % instructions.length] === "L" ? left : right;
    steps++;
  }

  return steps;
};
const data = await readInput();

const result = solve(data);

console.log(result);
