import { chunk } from "lodash";
import run from "../helpers/run";
import { getDistance } from "../services/api/getDistance";
import { getDistancesToCompute } from "../services/distances/getDistancesToCompute";
import { updateDistance } from "../services/distances/updateDistance";

const BATCH_SIZE = 100;
const delayMs = 0;

async function main() {
  const startedAt = Date.now();
  const distancesToCompute = await getDistancesToCompute();
  const chunked = chunk(distancesToCompute, BATCH_SIZE);
  console.log(
    `Started distances computation: ${distancesToCompute.length} missing`
  );

  for (let i = 0; i < chunked.length; i++) {
    const chunk = chunked[i];

    const requests = chunk.map(c =>
      getDistance(c.start, c.end)
        .then(distance => {
          if (distance != null) {
            return updateDistance(c.id, distance);
          }
          console.log(`skipped ${c.id}, api didnt returned`);
        })
        .catch(err => {
          console.log(`skipped ${c.id}, because error`);
        })
    );
    await Promise.all(requests);
    console.log(
      `${(i + 1) * BATCH_SIZE} / ${distancesToCompute.length} (+${Math.round(
        (Date.now() - startedAt) / 1000
      )}s)`
    );
    await new Promise(r => setTimeout(r, delayMs));
  }
}

run(main);
