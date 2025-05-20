import getDb from "../db";

async function updateZipCodeCoordinates(
  zipCodeId: number,
  { lat, long }: { lat: number; long: number }
) {
  if (lat == null || long == null) {
    return;
  }
  const db = await getDb();

  await db.query(
    `UPDATE zip_code zc SET zc.lat='${lat}', zc.long='${long}' WHERE id=${zipCodeId}`
  );
}

export { updateZipCodeCoordinates };
