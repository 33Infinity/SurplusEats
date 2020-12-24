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
    if (aLat1 == aLat2 && aLon1 == aLon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * aLat1) / 180;
      var radlat2 = (Math.PI * aLat2) / 180;
      var theta = aLon1 - aLon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (aUnit == "K") {
        dist = dist * 1.609344;
      }
      if (aUnit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  public static GetClosestNLocations(aLat, aLon, someLocations, anNAmount) {
    //const locationArray = [];
    return someLocations;
  }
}
