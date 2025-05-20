import getDb from "../db";

async function getAllByCode() {
  const db = await getDb();

  const [res] = await db.query("SELECT * FROM zip_code");
  const resultMap = new Map<
    string,
    { id: number; code: string; lat: string | null; long: string | null }
    // @ts-ignore
  >(res.map(result => [result.code, result]));

  return resultMap;
}

export { getAllByCode };
