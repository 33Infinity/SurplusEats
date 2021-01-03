import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import LocationRequest from "../requests/Location";

export default class Location {
  async getByVendor(aVendorId): Promise<LocationModel[] | null> {
    const request = new LocationRequest();
    const json = await request.getByVendor(aVendorId);
    return this.buildLocationModels(json);
  }

  buildLocationModels(someJson) {
    let locationModels: LocationModel[] = [];
    const vendorModel = VendorModel.NewVendor(
      someJson.Vendor.Name,
      someJson.Vendor.Description,
      someJson.Vendor.ImageUrl,
      someJson.Vendor.Id,
      someJson.Vendor.CreatedDate
    );
    for (let i = 0; i < someJson.Locations.length; i++) {
      const locationModel = LocationModel.NewLocation(
        vendorModel,
        someJson.Locations[i].Name,
        someJson.Locations[i].Latitude,
        someJson.Locations[i].Longitude,
        someJson.Locations[i].Address,
        someJson.Locations[i].PostalCode,
        someJson.Locations[i].Id,
        someJson.Locations[i].CreatedDate
      );
      locationModels.push(locationModel);
    }
    return locationModels;
  }
}
