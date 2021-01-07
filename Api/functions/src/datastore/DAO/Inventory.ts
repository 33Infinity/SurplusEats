import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import InventoryTO from "../TO/Inventory";

export default class Inventory {
  static async getByLocations(admin, someLocations): Promise<any> {
    const locationArray: string[] = [];
    someLocations.forEach((location) => {
      locationArray.push(location.Id);
    });
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(
        InventoryTO.ColumnNames.LocationId,
        Operators.in,
        locationArray
      )
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      InventoryTO.TableName,
      clauses
    );
    return response;
  }

  static async add(admin, inventory) {
    const inventoryTO = InventoryTO.NewInventory(
      inventory.Description,
      inventory.Price,
      inventory.Quantity,
      inventory.ImageUrl,
      inventory.LocationModel.Id,
      null,
      new Date()
    );
    const response = await SqlHelper.insert(
      admin,
      InventoryTO.TableName,
      inventoryTO.getTuple()
    );
    return response;
  }

  static async update(admin, anId, inventory) {
    const response = await SqlHelper.update(
      admin,
      InventoryTO.TableName,
      inventory,
      anId
    );
    return response;
  }

  static async delete(admin, anInventoryId) {
    const response = await SqlHelper.delete(
      admin,
      InventoryTO.TableName,
      anInventoryId
    );
    return response;
  }

  static Normalize(someJson) {
    const inventory = someJson.Inventory;
    const locations = someJson.Locations;
    const vendors = someJson.Vendors;
    return inventory.map((inventoryItem) => {
      const location = locations.find(
        (eachLocation) => eachLocation.Id === inventoryItem.LocationId
      );
      const vendor = vendors.find(
        (eachVendor) => eachVendor.Id === location.VendorId
      );
      location.Vendor = vendor;
      inventoryItem.Location = location;
      return inventoryItem;
    });
  }
}
