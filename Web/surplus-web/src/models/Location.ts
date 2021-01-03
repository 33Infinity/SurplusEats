import BaseModel from "./Base";
import VendorModel from "./Vendor";

export default class Location extends BaseModel {
  VendorModel: VendorModel;
  Name: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  PostalCode: string;
  private constructor(
    aVendorModel,
    aName,
    aLatitude,
    aLongitude,
    anAddress,
    aPostalCode,
    anId,
    aCreatedDate
  ) {
    super(anId, aCreatedDate);
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
    aPostalCode,
    anId,
    aCreatedDate
  ): Location {
    return new Location(
      aVendorModel,
      aName,
      aLatitude,
      aLongitude,
      anAddress,
      aPostalCode,
      anId,
      aCreatedDate
    );
  }
}
