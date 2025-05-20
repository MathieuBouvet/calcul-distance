import getDb from "../db";
import { ZipCode } from "./findOneZipCode";

async function getZipCodeToPlace() {
  const db = await getDb();

  const [res] = await db.query<ZipCode[]>(
    "SELECT * FROM zip_code zc WHERE zc.lat is NULL OR zc.long IS NULL"
  );

  return res;
}

export { getZipCodeToPlace };
