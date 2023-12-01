import fs from "fs";
import { URL, fileURLToPath } from "url";

const inputPath = fileURLToPath(
  new URL(`${process.cwd()}/input.txt`, import.meta.url)
);

export const readInput = (path = inputPath) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(data);
    })
  );
};
