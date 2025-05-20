import getDb from "../db";

async function updateAddressCoordinates(
  addressId: number,
  { lat, long }: { lat: number; long: number }
) {
  if (lat == null || long == null) {
    return;
  }
  const db = await getDb();

  await db.query(
    `UPDATE address a SET a.lat='${lat}', a.long='${long}' WHERE id=${addressId}`
  );
}

export { updateAddressCoordinates };
