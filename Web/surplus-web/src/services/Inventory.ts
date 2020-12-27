import InventoryRequest from "../requests/Inventory";
import InventoryModel from "../models/InventoryModel";
import LocationModel from "../models/LocationModel";
import VendorModel from "../models/VendorModel";
export default class Inventory {
  async getByLocation(aLat, aLon): Promise<InventoryModel[] | null> {
    const request = new InventoryRequest();
    const json = await request.getByLocation(aLat, aLon);
    return this.buildInventoryModels(json);
  }

  async getByVendor(aVendorModel): Promise<InventoryModel[] | null> {
    const request = new InventoryRequest();
    const json = await request.getByVendor(aVendorModel);
    return this.buildInventoryModels(json);
  }

  buildInventoryModels(someJson) {
    let inventoryModels: InventoryModel[] = [];
    for (let i = 0; i < someJson.length; i++) {
      let vendorModel = VendorModel.NewVendor(
        someJson[i].Location.Vendor.Name,
        someJson[i].Location.Vendor.Description,
        someJson[i].Location.Vendor.ImageUrl,
        someJson[i].Location.Vendor.Id,
        someJson[i].Location.Vendor.CreatedDate
      );
      let locationModel = LocationModel.NewLocation(
        vendorModel,
        someJson[i].Location.Name,
        someJson[i].Location.Latitude,
        someJson[i].Location.Longitude,
        someJson[i].Location.Address,
        someJson[i].Location.PostalCode,
        someJson[i].Location.Id,
        someJson[i].Location.CreatedDate
      );
      let inventoryModel = InventoryModel.NewInventory(
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
