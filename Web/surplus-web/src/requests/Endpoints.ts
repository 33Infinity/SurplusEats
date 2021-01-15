export default class Endpoints {
  static Authentication = class {
    public static register =
      "http://localhost:6002/surplus-functions/us-central1/auth-register";
    public static signIn = "";
  };

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
      "http://localhost:6002/surplus-functions/us-central1/location-add";
    public static deleteLocation =
      "http://localhost:6002/surplus-functions/us-central1/location-delete";
    public static getByLatLon =
      "http://localhost:6002/surplus-functions/us-central1/location-getByLatLon";
    public static getByVendor =
      "http://localhost:6002/surplus-functions/us-central1/location-getByVendor";
    public static updateLocation =
      "http://localhost:6002/surplus-functions/us-central1/location-update";
  };
}
