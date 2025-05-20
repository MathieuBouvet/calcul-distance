import getDb from "../db";

async function createZipCodes(zipCodes: string[]) {
  const db = await getDb();
  await db.query(
    `INSERT INTO zip_code (code) VALUES ${zipCodes
      .map(val => `('${val}')`)
      .join(", ")}`
  );
}

export { createZipCodes };
