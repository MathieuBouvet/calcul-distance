import run from "../helpers/run";
import getDb from "../services/db";
import fs from "fs/promises";
import { getOneByTravel } from "../services/distances/getOne";

const fileName = "output.csv";

async function main() {
  const input = await fs
    .readFile("./input.csv", "utf-8")
    .then(file => file.split("\n").map(line => line.split(";")));

  let nbOfNull = 0;

  await fs.writeFile(fileName, "");
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const zipCode = line[0];
    const address = line[1].trim().replace("\\", "");
    const res = await getOneByTravel(zipCode, address);

    if (res == null) {
      nbOfNull++;
    }

    await fs.writeFile(fileName, `${line[0]};${line[1]};${res ?? ""}\n`, {
      flag: "a+",
    });
    console.log(`${i + 1} / ${input.length}`);
  }
  console.log(`${nbOfNull} null results`);
}

run(main);
