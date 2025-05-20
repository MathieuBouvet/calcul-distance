async function getGeocode(query: string) {
  const resRaw = await fetch(
    `https://data.geopf.fr/geocodage/search?q=${query}`
  );
  const res = await resRaw.json();

  const [long = null, lat = null] =
    res.features?.[0]?.geometry?.coordinates ?? [];

  return { lat, long };
}

export { getGeocode };
