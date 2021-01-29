import InventoryRequest from "../requests/Inventory";
import InventoryModel from "../models/Inventory";
import LocationModel from "../models/Location";
import VendorModel from "../models/Vendor";
import BaseService from "./BaseService";
import ErrorModel from "../models/Error";

export default class Inventory extends BaseService {
  async getByLocation(aLat, aLon): Promise<InventoryModel[] | null> {
    const request = new InventoryRequest();
    const json = await request.getByLocation(aLat, aLon);
    return this.buildInventoryModels(json);
  }

  async getByVendorLocation(
    aVendorId,
    aLocationId
  ): Promise<InventoryModel[] | ErrorModel> {
    const request = new InventoryRequest();
    const json = await request.getByVendorLocation(aVendorId, aLocationId);
    if (this.isApiError(json)) {
      return ErrorModel.NewError(json.ErrorMessage);
    }
    return this.buildInventoryModels(json);
  }

  async addInventory(anInventoryModel) {
    const request = new InventoryRequest();
    const json = await request.addInventory(anInventoryModel);
    return !this.isApiError(json);
  }

  async updateInventory(anInventoryModel) {
    const request = new InventoryRequest();
    const json = await request.updateInventory(anInventoryModel);
    return !this.isApiError(json);
  }

  async deleteInventory(anInventoryId) {
    const request = new InventoryRequest();
    const json = await request.deleteInventory(anInventoryId);
    return !this.isApiError(json);
  }

  buildInventoryModels(someJson) {
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
        someJson[i].Location.Id,
        someJson[i].Location.CreatedDate
      );
      const inventoryModel = InventoryModel.NewInventory(
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
