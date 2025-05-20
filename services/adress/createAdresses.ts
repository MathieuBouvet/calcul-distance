import getDb from "../db";

async function createAddresses(addresses: string[]) {
  const db = await getDb();
  await db.query(
    `INSERT IGNORE INTO address (address) VALUES ${addresses
      .map(val => `("${val}")`)
      .join(", ")}`
  );
}

export { createAddresses };
