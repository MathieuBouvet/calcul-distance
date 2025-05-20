import fs from "fs/promises";
import { createZipCodes } from "../services/zipCode/createZipCodes";
import run from "../helpers/run";

async function main() {
  const input = await fs
    .readFile("./input.csv", "utf-8")
    .then(file => file.split("\n").map(line => line.split(";")));

  const zipCodes = new Set(input.map(line => line[0]));

  await createZipCodes([...zipCodes.values()]);
}

run(main);

export {};
