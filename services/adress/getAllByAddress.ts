import getDb from "../db";

async function getAllByAddress() {
  const db = await getDb();

  const [res] = await db.query("SELECT * FROM address");
  const resultMap = new Map<
    string,
    { id: number; address: string; lat: string | null; long: string | null }
    // @ts-ignore
  >(res.map(result => [result.address, result]));

  return resultMap;
}

export { getAllByAddress };
