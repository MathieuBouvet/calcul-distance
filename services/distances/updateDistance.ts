import getDb from "../db";

async function updateDistance(distanceId: number, distance: number | null) {
  if (distance == null) {
    return;
  }
  const db = await getDb();

  await db.query(
    `UPDATE distance d SET d.km=${distance} WHERE id=${distanceId}`
  );
}

export { updateDistance };
