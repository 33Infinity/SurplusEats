import BaseModel from "./BaseModel";
import VendorModel from "./VendorModel";

export default class LocationModel extends BaseModel {
  VendorModel: VendorModel;
  Name: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  PostalCode: string;
  constructor(
    aVendorModel,
    aName,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode
  ) {
    super();
    this.VendorModel = aVendorModel;
    this.Name = aName;
    this.Latitude = aLatitude;
    this.Longitude = aLongitude;
    this.Address = anAddress;
    this.PostalCode = aPostalCode;
  }
  public static NewLocation(
    aVendorModel,
    aName,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode
  ): LocationModel {
    return new LocationModel(
      aVendorModel,
      aName,
      aLatitude,
      aLongitude,
      anAddress,
      aPostalCode
    );
  }
}
