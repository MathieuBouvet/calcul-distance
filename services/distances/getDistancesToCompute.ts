import { RowDataPacket } from "mysql2";
import getDb from "../db";

export interface Distance extends RowDataPacket {
  id: number;
  zip_code_id: number;
  address_id: number;
  distance: number | null;
  line: number;
  zip_code_lat: string | null;
  zip_code_long: string | null;
  address_lat: string | null;
  address_long: string | null;
}

async function getDistancesToCompute() {
  const db = await getDb();

  const [res] = await db.query<Distance[]>(
    "SELECT d.*, zc.lat as zip_code_lat, zc.long as zip_code_long, a.lat as address_lat, a.long as address_long \
      FROM distance d JOIN zip_code zc ON d.zip_code_id=zc.id JOIN address a ON d.address_id=a.id \
      WHERE d.km IS NULL and zc.lat IS NOT NULL \
      AND zc.long IS NOT NULL AND a.lat IS NOT NULL AND a.long IS NOT NULL"
  );

  return res.map(r => ({
    id: r.id,
    line: r.line,
    start: { lat: r.zip_code_lat, long: r.zip_code_long },
    end: { lat: r.address_lat, long: r.address_long },
  }));
}

export { getDistancesToCompute };
