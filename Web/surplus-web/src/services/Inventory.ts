import InventoryRequest from "../requests/Inventory";
import InventoryModel from "../models/Inventory";
import LocationModel from "../models/Location";
import InventoryCategoryModel from "../models/InventoryCategory";
import VendorCategoryModel from "../models/VendorCategory";
import VendorModel from "../models/Vendor";
import BaseService from "./BaseService";
import ErrorModel from "../models/Error";
import Constants from "../constants";

export default class Inventory extends BaseService {
  static async add(anInventoryModel) {
    const json = await InventoryRequest.add(anInventoryModel);
    return !this.isApiError(json);
  }

  static async delete(anInventoryId) {
    const json = await InventoryRequest.delete(anInventoryId);
    return !this.isApiError(json);
  }

  static async getById(anId): Promise<InventoryModel | ErrorModel> {
    const json = await InventoryRequest.getById(anId);
    if (json == null)
      return ErrorModel.NewError(Constants.Errors.inventoryNotFound);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildInventoryModel(json[0]);
  }

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

  static async update(anInventoryModel) {
    const json = await InventoryRequest.update(anInventoryModel);
    return !this.isApiError(json);
  }

  static buildInventoryModels(someJson) {
    const inventoryModels: InventoryModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      inventoryModels.push(this.buildInventoryModel(someJson[i]));
    }
    return inventoryModels;
  }

  static buildInventoryModel(someJson) {
    const vendorCategories: VendorCategoryModel[] = [];
    for (let i = 0; i < someJson.Vendor?.Categories?.length; i++) {
      vendorCategories.push(
        VendorCategoryModel.NewVendorCategory(
          someJson.Vendor.Categories[i].Name,
          someJson.Vendor.Categories[i].Id,
          someJson.Vendor.Categories[i].CreatedDate
        )
      );
    }
    const vendorModel = VendorModel.NewVendor(
      someJson.Location.Vendor.UserEmail,
      someJson.Location.Vendor.Name,
      someJson.Location.Vendor.ImageUrl,
      someJson.Location.Vendor.Description,
      vendorCategories,
      someJson.Location.Vendor.Id,
      someJson.Location.Vendor.CreatedDate
    );
    const locationModel = LocationModel.NewLocation(
      vendorModel,
      someJson.Location.Name,
      someJson.Location.City,
      someJson.Location.State,
      someJson.Location.Latitude,
      someJson.Location.Longitude,
      someJson.Location.Address,
      someJson.Location.PostalCode,
      someJson.Location.PhoneArea,
      someJson.Location.PhoneNumber,
      someJson.Location.Id,
      someJson.Location.CreatedDate
    );
    const inventoryCategories: InventoryCategoryModel[] = [];
    for (let i = 0; i < someJson.Categories?.length; i++) {
      inventoryCategories.push(
        InventoryCategoryModel.NewInventoryCategory(
          someJson.Categories[i].Name,
          someJson.Categories[i].Id,
          someJson.Categories[i].CreatedDate
        )
      );
    }
    return InventoryModel.NewInventory(
      someJson.Name,
      someJson.Description,
      someJson.Price,
      someJson.Quantity,
      someJson.ImageUrl,
      locationModel,
      inventoryCategories,
      someJson.Id,
      someJson.CreatedDate
    );
  }
}
