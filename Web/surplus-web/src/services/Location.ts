import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import LocationRequest from "../requests/Location";

export default class Location {
  async getByLatLon(aLat, aLon): Promise<LocationModel[] | null> {
    const request = new LocationRequest();
    const json = await request.getByLatLon(aLat, aLon);
    return this.buildLocationModels(json);
  }

  async getByVendor(aVendorId): Promise<LocationModel[] | null> {
    const request = new LocationRequest();
    const json = await request.getByVendor(aVendorId);
    return this.buildLocationModels(json);
  }

  async addLocation(aLocationModel) {
    const request = new LocationRequest();
    const json = await request.addLocation(aLocationModel);
    return !json.HasError;
  }

  buildLocationModels(someJson) {
    let locationModels: LocationModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      const locationModel = LocationModel.NewLocation(
        VendorModel.NewVendor(
          someJson[i].Vendor.Name,
          someJson[i].Vendor.Description,
          someJson[i].Vendor.ImageUrl,
          someJson[i].Vendor.Id,
          someJson[i].Vendor.CreatedDate
        ),
        someJson[i].Name,
        someJson[i].Latitude,
        someJson[i].Longitude,
        someJson[i].Address,
        someJson[i].PostalCode,
        someJson[i].Id,
        someJson[i].CreatedDate
      );
      locationModels.push(locationModel);
    }
    return locationModels;
  }
}
