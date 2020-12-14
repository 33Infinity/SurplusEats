import BaseModel from "./BaseModel";

export default class LocationModel extends BaseModel {
  Name: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  PostalCode: string;
  constructor(aName, aLatitude, aLongitude, anAddress, aPostalCode) {
    super();
    this.Name = aName;
    this.Latitude = aLatitude;
    this.Longitude = aLongitude;
    this.Address = anAddress;
    this.PostalCode = aPostalCode;
  }
  public static NewLocation(
    aName,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode
  ): LocationModel {
    return new LocationModel(
      aName,
      aLatitude,
      aLongitude,
      anAddress,
      aPostalCode
    );
  }
}
