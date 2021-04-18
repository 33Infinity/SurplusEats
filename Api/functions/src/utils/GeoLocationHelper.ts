export default class GeoLocationHelper {
  //Default aUnit is M=miles
  //K=kilometers
  //N=NauticalMiles
  public static calculateDistanceFromLatLong(
    aLat1,
    aLon1,
    aLat2,
    aLon2,
    aUnit
  ) {
    if (aLat1 === aLat2 && aLon1 === aLon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * aLat1) / 180;
      const radlat2 = (Math.PI * aLat2) / 180;
      const theta = aLon1 - aLon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (aUnit === "K") {
        dist = dist * 1.609344;
      }
      if (aUnit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  public static GetClosestNLocations(
    aLat,
    aLon,
    someLocations,
    anNAmount
  ): Promise<any> {
    //const locationArray = [];
    return someLocations;
  }
}
