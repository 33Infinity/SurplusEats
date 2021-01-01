import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import InventoryTable from "../TO/Inventory";

export default class Inventory {
  static async getInventoryByLocations(admin, someLocations): Promise<any> {
    const locationArray: string[] = [];
    someLocations.forEach((location) => {
      locationArray.push(location.Id);
    });
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(InventoryTable.LocationId, Operators.in, locationArray)
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      InventoryTable.TableName,
      clauses
    );
    return response;
  }

  static async addInventory(admin, inventory) {
    const inventoryToInsert = {
      Description: inventory.Description,
      ImageUrl: inventory.ImageUrl,
      LocationId: inventory.LocationModel.Id,
      Price: inventory.Price,
      Quantity: inventory.Quantity,
    };
    const response = await SqlHelper.insert(
      admin,
      InventoryTable.TableName,
      inventoryToInsert
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
