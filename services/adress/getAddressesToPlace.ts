import getDb from "../db";
import { Address } from "./findOneAddress";

async function getAddressesToPlace() {
  const db = await getDb();

  const [res] = await db.query<Address[]>(
    "SELECT * FROM address a WHERE a.lat is NULL OR a.long IS NULL"
  );

  return res;
}

export { getAddressesToPlace };
