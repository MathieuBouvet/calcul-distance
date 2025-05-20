import run from "../helpers/run";
import { getGeocode } from "../services/api/getGeocode";
import { getZipCodeToPlace } from "../services/zipCode/getZipCodeToPlace";
import { chunk } from "lodash";
import { updateZipCodeCoordinates } from "../services/zipCode/updateZipCodeCoordinates";

const BATCH_SIZE = 1;

async function main() {
  const zipCodeToPlace = await getZipCodeToPlace();
  let i = 1;
  for (let batch of chunk(zipCodeToPlace, BATCH_SIZE)) {
    const requests = batch.map(z =>
      getGeocode(z.code).then(coord => {
        if (coord.lat != null && coord.long != null) {
          return updateZipCodeCoordinates(z.id, coord);
        }
        console.log(`skipped ${z.id}, api didn't returned`);
      })
    );

    await Promise.all(requests);
    console.log(batch.length * i + " / " + zipCodeToPlace.length);
    i++;
  }
}

run(main);
