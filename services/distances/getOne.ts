import { RowDataPacket } from "mysql2";
import getDb from "../db";

interface Res extends RowDataPacket {
  km: number;
}

async function getOneByTravel(zipCode: string, address: string) {
  const db = await getDb();

  const [res] = await db.query<Res[]>(
    "SELECT d.km FROM distance d \
  LEFT JOIN zip_code zc ON d.zip_code_id=zc.id \
  LEFT JOIN address a ON d.address_id=a.id \
  WHERE zc.code = '" +
      zipCode +
      "' AND a.address LIKE \"" +
      address +
      '"'
  );

  return res?.[0]?.km ?? null;
}

export { getOneByTravel };
