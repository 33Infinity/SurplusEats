import SqlHelper from "../utils/SqlHelper";
import GeoLocationHelper from "../utils/GeoLocationHelper";
import LocationTO from "../datastore/to/Location";
import VendorTO from "../datastore/to/Vendor";
import InventoryTO from "../datastore/to/Inventory";
import IResponse from "../IResponse";
import InventoryDAO from "../datastore/dao/Inventory";
import VendorDAO from "../datastore/dao/Vendor";

export default class Inventory {
  static async getByLocation(admin, aLatitude, aLongitude) {
    let retObj: IResponse = {};
    let locations = await SqlHelper.get(admin, LocationTO.TableName);
    const closestLocations = GeoLocationHelper.GetClosestNLocations(
      aLatitude,
      aLongitude,
      locations,
      10
    );
    if (closestLocations == null) return null;
    let inventory = await InventoryDAO.getByLocations(admin, closestLocations);
    retObj.Inventory = inventory;
    retObj.Locations = closestLocations;
    retObj.Vendors = await VendorDAO.getVendorByLocations(
      admin,
      closestLocations
    );
    return InventoryDAO.Normalize(retObj);
  }

  static async getByVendorLocation(admin, aVendorId, aLocationId) {
    let retObj: IResponse = {};
    const vendors = await SqlHelper.getById(
      admin,
      VendorTO.TableName,
      aVendorId
    );
    const locations = await SqlHelper.getById(
      admin,
      LocationTO.TableName,
      aLocationId
    );
    const inventory = await InventoryDAO.getByLocations(admin, locations);
    retObj.Inventory = inventory;
    retObj.Locations = locations;
    retObj.Vendors = vendors;
    return InventoryDAO.Normalize(retObj);
  }

  static async add(
    admin,
    aName,
    aDescription,
    aPrice,
    aQuantity,
    anImageUrl,
    aLocationId
  ) {
    const inventoryTO = InventoryTO.NewInventory(
      aName,
      aDescription,
      aPrice,
      aQuantity,
      anImageUrl,
      aLocationId,
      null,
      new Date()
    );
    const response = await InventoryDAO.add(admin, inventoryTO);
    return response;
  }

  static async update(
    admin,
    aName,
    aDescription,
    aPrice,
    aQuantity,
    aImageUrl,
    aLocationId,
    anId,
    aCreatedDate
  ) {
    const inventoryTO = InventoryTO.NewInventory(
      aName,
      aDescription,
      aPrice,
      aQuantity,
      aImageUrl,
      aLocationId,
      anId,
      aCreatedDate
    );
    const resp = await InventoryDAO.update(admin, anId, inventoryTO.getTuple());
    return resp;
  }

  static async delete(admin, anInventoryId) {
    const response = await InventoryDAO.delete(admin, anInventoryId);
    return response;
  }
}
