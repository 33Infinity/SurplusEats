import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import LocationRequest from "../requests/Location";
import ErrorModel from "../models/Error";
import BaseService from "./BaseService";

export default class Location extends BaseService {
  async getByLatLon(aLat, aLon): Promise<LocationModel[] | null | ErrorModel> {
    const request = new LocationRequest();
    const json = await request.getByLatLon(aLat, aLon);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildLocationModels(json);
  }

  async getByVendor(anEmail): Promise<LocationModel[] | null | ErrorModel> {
    const request = new LocationRequest();
    const json = await request.getByVendor(anEmail);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildLocationModels(json);
  }

  async getLatLonFromLocation(aLocationModel): Promise<any | ErrorModel> {
    const request = new LocationRequest();
    const json = await request.getLatLonFromLocation(aLocationModel);
    if (json == null || json.length == 0) {
      return ErrorModel.NewError("Invalid Address");
    }
    return json;
  }

  async addLocation(aLocationModel) {
    const request = new LocationRequest();
    const json = await request.addLocation(aLocationModel);
    return this.isApiError(json);
  }

  async updateLocation(aLocationModel) {
    const request = new LocationRequest();
    const json = await request.updateLocation(aLocationModel);
    return this.isApiError(json);
  }

  async deleteLocation(aLocationId) {
    const request = new LocationRequest();
    const json = await request.deleteLocation(aLocationId);
    return this.isApiError(json);
  }

  buildLocationModels(someJson) {
    let locationModels: LocationModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      const locationModel = LocationModel.NewLocation(
        VendorModel.NewVendor(
          someJson[i].Vendor.UserEmail,
          someJson[i].Vendor.Name,
          someJson[i].Vendor.ImageUrl,
          someJson[i].Vendor.Description,
          someJson[i].Vendor.Id,
          someJson[i].Vendor.CreatedDate
        ),
        someJson[i].Name,
        someJson[i].City,
        someJson[i].State,
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
