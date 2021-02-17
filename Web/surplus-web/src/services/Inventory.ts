import InventoryRequest from "../requests/Inventory";
import InventoryModel from "../models/Inventory";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import BaseService from "./BaseService";
import ErrorModel from "../models/Error";

export default class Inventory extends BaseService {
  static async getByLocation(
    aLat,
    aLon
  ): Promise<InventoryModel[] | null | ErrorModel> {
    const json = await InventoryRequest.getByLocation(aLat, aLon);
    if (json == null) return null;
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildInventoryModels(json);
  }

  static async getByVendorLocation(
    aVendorId,
    aLocationId
  ): Promise<InventoryModel[] | ErrorModel> {
    const json = await InventoryRequest.getByVendorLocation(
      aVendorId,
      aLocationId
    );
    if (json == null) return [];
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildInventoryModels(json);
  }

  static async add(anInventoryModel) {
    const json = await InventoryRequest.add(anInventoryModel);
    return !this.isApiError(json);
  }

  static async update(anInventoryModel) {
    const json = await InventoryRequest.update(anInventoryModel);
    return !this.isApiError(json);
  }

  static async delete(anInventoryId) {
    const json = await InventoryRequest.delete(anInventoryId);
    return !this.isApiError(json);
  }

  static buildInventoryModels(someJson) {
    const inventoryModels: InventoryModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      const vendorModel = VendorModel.NewVendor(
        someJson[i].Location.Vendor.UserEmail,
        someJson[i].Location.Vendor.Name,
        someJson[i].Location.Vendor.ImageUrl,
        someJson[i].Location.Vendor.Description,
        someJson[i].Location.Vendor.Id,
        someJson[i].Location.Vendor.CreatedDate
      );
      const locationModel = LocationModel.NewLocation(
        vendorModel,
        someJson[i].Location.Name,
        someJson[i].Location.City,
        someJson[i].Location.State,
        someJson[i].Location.Latitude,
        someJson[i].Location.Longitude,
        someJson[i].Location.Address,
        someJson[i].Location.PostalCode,
        someJson[i].Location.PhoneArea,
        someJson[i].Location.PhoneNumber,
        someJson[i].Location.Id,
        someJson[i].Location.CreatedDate
      );
      const inventoryModel = InventoryModel.NewInventory(
        someJson[i].Name,
        someJson[i].Description,
        someJson[i].Price,
        someJson[i].Quantity,
        someJson[i].ImageUrl,
        locationModel,
        someJson[i].Id,
        someJson[i].CreatedDate
      );
      inventoryModels.push(inventoryModel);
    }
    return inventoryModels;
  }
}
