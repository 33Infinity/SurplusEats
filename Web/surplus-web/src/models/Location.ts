import BaseModel from "./Base";
import VendorModel from "./Vendor";

export default class Location extends BaseModel {
  VendorModel: VendorModel;
  Name: string;
  City: string;
  State: string;
  Latitude: number;
  Longitude: number;
  Address: string;
  PostalCode: string;
  private constructor(
    aVendorModel,
    aName,
    aCity,
    aState,
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
    this.City = aCity;
    this.State = aState;
    this.Latitude = aLatitude;
    this.Longitude = aLongitude;
    this.Address = anAddress;
    this.PostalCode = aPostalCode;
  }
  public static NewLocation(
    aVendorModel,
    aName,
    aCity,
    aState,
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
      aCity,
      aState,
      aLatitude,
      aLongitude,
      anAddress,
      aPostalCode,
      anId,
      aCreatedDate
    );
  }
  public static NewBlankLocation(aVendorModel): Location {
    return new Location(aVendorModel, "", "", "", "", "", "", "", "", "");
  }
}
