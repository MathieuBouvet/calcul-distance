import { QueryResult, RowDataPacket } from "mysql2";
import getDb from "../db";

export interface ZipCode extends RowDataPacket {
  id: number;
  code: string;
  lat: string | null;
  long: string | null;
}

async function findOneZipCode(code: string) {
  const db = await getDb();
  const [res] = await db.query<ZipCode[]>(
    `SELECT * FROM zip_code zc WHERE zc.code = "${code}"`
  );
  return res[0];
}

export { findOneZipCode };
