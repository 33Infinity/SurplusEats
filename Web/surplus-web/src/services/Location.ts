import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import LocationRequest from "../requests/Location";
import ErrorModel from "../models/Error";
import BaseService from "./BaseService";

export default class Location extends BaseService {
  static async getByLatLon(
    aLat,
    aLon
  ): Promise<LocationModel[] | null | ErrorModel> {
    const json = await LocationRequest.getByLatLon(aLat, aLon);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildLocationModels(json);
  }

  static async getByVendor(
    anEmail
  ): Promise<LocationModel[] | null | ErrorModel> {
    const json = await LocationRequest.getByVendor(anEmail);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildLocationModels(json);
  }

  static async getLatLonFromLocation(
    aLocationModel
  ): Promise<any | ErrorModel> {
    const json = await LocationRequest.getLatLonFromLocation(aLocationModel);
    if (json == null || json.length == 0) {
      return ErrorModel.NewError("Invalid Address");
    }
    return json;
  }

  static async add(aLocationModel) {
    const json = await LocationRequest.add(aLocationModel);
    return this.isApiError(json);
  }

  static async update(aLocationModel) {
    const json = await LocationRequest.update(aLocationModel);
    return this.isApiError(json);
  }

  static async delete(aLocationId) {
    const json = await LocationRequest.delete(aLocationId);
    return this.isApiError(json);
  }

  static buildLocationModels(someJson) {
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
