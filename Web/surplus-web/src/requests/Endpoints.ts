export default class Endpoints {
  static Inventory = class {
    public static addInventory =
      "http://localhost:6002/surplus-functions/us-central1/inventory-add";
    public static getByLocation =
      "http://localhost:6002/surplus-functions/us-central1/inventory-getByLocation";
    //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByLocation";
    public static getByVendorLocation =
      "http://localhost:6002/surplus-functions/us-central1/inventory-getByVendorLocation";
    //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByVendor";
  };

  static Location = class {
    public static getByVendor =
      "http://localhost:6002/surplus-functions/us-central1/location-getByVendor";
  };
}
