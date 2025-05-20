import fs from "fs/promises";
import run from "../helpers/run";
import { createAddresses } from "../services/adress/createAdresses";

async function main() {
  const input = await fs
    .readFile("./input.csv", "utf-8")
    .then(file => file.split("\n").map(line => line.split(";")));

  const addresses = new Set(
    input.map(line => line[1].trim().replace("\\", ""))
  );

  console.log(addresses.values());

  await createAddresses([...addresses.values()]);
}

run(main);

export {};
