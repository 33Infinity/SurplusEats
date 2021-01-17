import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import LocationRequest from "../requests/Location";

export default class Location {
  async getByLatLon(aLat, aLon): Promise<LocationModel[] | null> {
    const request = new LocationRequest();
    const json = await request.getByLatLon(aLat, aLon);
    return json != null ? this.buildLocationModels(json) : null;
  }

  async getByVendor(anEmail): Promise<LocationModel[] | null> {
    const request = new LocationRequest();
    const json = await request.getByVendor(anEmail);
    return json != null ? this.buildLocationModels(json) : null;
  }

  async addLocation(aLocationModel) {
    const request = new LocationRequest();
    const json = await request.addLocation(aLocationModel);
    return !json.HasError;
  }

  async updateLocation(aLocationModel) {
    const request = new LocationRequest();
    const json = await request.updateLocation(aLocationModel);
    return !json.HasError;
  }

  async deleteLocation(aLocationId) {
    const request = new LocationRequest();
    const json = await request.deleteLocation(aLocationId);
    return !json.HasError;
  }

  buildLocationModels(someJson) {
    let locationModels: LocationModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      const locationModel = LocationModel.NewLocation(
        VendorModel.NewVendor(
          someJson[i].Vendor.Name,
          someJson[i].Vendor.ImageUrl,
          someJson[i].Vendor.Description,
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
