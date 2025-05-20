import run from "../helpers/run";
import { getGeocode } from "../services/api/getGeocode";
import { getZipCodeToPlace } from "../services/zipCode/getZipCodeToPlace";
import { chunk } from "lodash";
import { updateZipCodeCoordinates } from "../services/zipCode/updateZipCodeCoordinates";
import { getAddressesToPlace } from "../services/adress/getAddressesToPlace";
import { updateAddressCoordinates } from "../services/adress/updateAddressCoordinates";

const BATCH_SIZE = 1;

async function main() {
  const addresses = await getAddressesToPlace();
  let i = 1;
  const startedAt = Date.now();
  for (let batch of chunk(addresses, BATCH_SIZE)) {
    const requests = batch.map(a =>
      getGeocode(a.address)
        .then(coord => {
          if (coord.lat != null && coord.long != null) {
            return updateAddressCoordinates(a.id, coord);
          }
          console.log(`skipped ${a.id}, api didn't returned`);
        })
        .catch(err => {
          console.log(`skipped ${a.id}, because error`);
        })
    );

    await Promise.all(requests);
    console.log(
      batch.length * i +
        " / " +
        addresses.length +
        ` (ellapsed time ${Math.round((Date.now() - startedAt) / 1000)}s)`
    );
    i++;
    await new Promise(r => setTimeout(r, 100));
  }
}

run(main);
