import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import LocationRequest from "../requests/Location";
import ErrorModel from "../models/Error";
import BaseService from "./BaseService";

export default class Location extends BaseService {
  static async add(aLocationModel) {
    const json = await LocationRequest.add(aLocationModel);
    return this.isApiError(json);
  }

  static async delete(aLocationId) {
    const json = await LocationRequest.delete(aLocationId);
    return this.isApiError(json);
  }

  static async getById(anId): Promise<LocationModel | null> {
    const json = await LocationRequest.getById(anId);
    if (this.isApiError(json)) {
      return null;
    }
    return this.buildLocationModel(json[0]);
  }

  static async getByLatLon(
    aLat,
    aLon
  ): Promise<LocationModel[] | null | ErrorModel> {
    const json = await LocationRequest.getByLatLon(aLat, aLon);
    if (json == null) return [];
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildLocationModels(json);
  }

  static async getByVendor(
    anEmail
  ): Promise<LocationModel[] | null | ErrorModel> {
    const json = await LocationRequest.getByVendor(anEmail);
    if (json == null) return [];
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

  static async update(aLocationModel) {
    const json = await LocationRequest.update(aLocationModel);
    return this.isApiError(json);
  }

  static buildLocationModels(someJson) {
    let locationModels: LocationModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      locationModels.push(this.buildLocationModel(someJson[i]));
    }
    return locationModels;
  }

  static buildLocationModel(someJson) {
    return LocationModel.NewLocation(
      VendorModel.NewVendor(
        someJson.Vendor?.UserEmail,
        someJson.Vendor?.Name,
        someJson.Vendor?.ImageUrl,
        someJson.Vendor?.Description,
        someJson.Vendor?.Id,
        someJson.Vendor?.CreatedDate
      ),
      someJson.Name,
      someJson.City,
      someJson.State,
      someJson.Latitude,
      someJson.Longitude,
      someJson.Address,
      someJson.PostalCode,
      someJson.PhoneArea,
      someJson.PhoneNumber,
      someJson.Id,
      someJson.CreatedDate
    );
  }
}
