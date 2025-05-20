type Coord = {
  lat: string | null;
  long: string | null;
};

function isValid(coord: Coord) {
  return coord.lat != null && coord.long != null;
}

function getQueryCoord(coord: Coord) {
  return `${coord.long},${coord.lat}`;
}

const profile = "car";
const resource = "bdtopo-osrm";
const getSteps = "false";
const distanceUnit = "kilometer";
const optimization = "fastest";

async function getDistance(start: Coord, end: Coord) {
  if (!isValid(start) || !isValid(end)) {
    return null;
  }

  const rawRes = await fetch(
    `https://data.geopf.fr/navigation/itineraire?start=${getQueryCoord(
      start
    )}&end=${getQueryCoord(
      end
    )}&profile=${profile}&resource=${resource}&getSteps=${getSteps}&distanceUnit=${distanceUnit}&optimization=${optimization}`
  );

  const res = await rawRes.json();
  return res.distance ?? null;
}

export { getDistance };
