import run from "../helpers/run";
import getDb from "../services/db";
import fs from "fs/promises";
import { getAllByCode } from "../services/zipCode/getAllByCode";
import { getAllByAddress } from "../services/adress/getAllByAddress";
import { findOneZipCode } from "../services/zipCode/findOneZipCode";
import { findOneAddress } from "../services/adress/findOneAddress";

async function main() {
  const db = await getDb();

  const input = await fs
    .readFile("./input.csv", "utf-8")
    .then(file => file.split("\n").map(line => line.split(";")));

  console.log(input.length);
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const [zipCode, address] = await Promise.all([
      findOneZipCode(line[0]),
      findOneAddress(line[1].trim().replace("\\", "")),
    ]);

    await db.execute(
      `INSERT IGNORE INTO distance (zip_code_id, address_id, line) VALUES (${zipCode.id}, ${address.id}, ${i})`
    );
    console.log(i);
  }
}

run(main);
