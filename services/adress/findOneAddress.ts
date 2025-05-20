import { QueryResult, RowDataPacket } from "mysql2";
import getDb from "../db";

export interface Address extends RowDataPacket {
  id: number;
  address: string;
  lat: string | null;
  long: string | null;
}

async function findOneAddress(address: string) {
  const db = await getDb();
  const [res] = await db.query<Address[]>(
    `SELECT * FROM address a WHERE a.address = "${address}"`
  );
  return res[0];
}

export { findOneAddress };
