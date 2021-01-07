export default class Endpoints {
  static Inventory = class {
    public static addInventory =
      "http://localhost:6002/surplus-functions/us-central1/inventory-add";
    public static deleteInventory =
      "http://localhost:6002/surplus-functions/us-central1/inventory-delete";
    public static getByLocation =
      "http://localhost:6002/surplus-functions/us-central1/inventory-getByLocation";
    //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByLocation";
    public static getByVendorLocation =
      "http://localhost:6002/surplus-functions/us-central1/inventory-getByVendorLocation";
    //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByVendor";
    public static updateInventory =
      "http://localhost:6002/surplus-functions/us-central1/inventory-update";
  };

  static Location = class {
    public static addLocation =
      "http://localhost:6002/surplus-functions/us-central1/location-addLocation";
    public static getByVendor =
      "http://localhost:6002/surplus-functions/us-central1/location-getByVendor";
  };
}
