export default class Endpoints {
  public static addInventory =
    "http://localhost:6002/surplus-functions/us-central1/inventory-addInventory";
  public static getByLocation =
    "http://localhost:6002/surplus-functions/us-central1/inventory-getByLocation";
  //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByLocation";
  public static getByVendorLocation =
    "http://localhost:6002/surplus-functions/us-central1/inventory-getByVendorLocation";
  //"https://us-central1-surplus-functions.cloudfunctions.net/inventory-getByVendor";
  public static saveFile =
    "http://localhost:6002/surplus-functions/us-central1/inventory-saveFile";
}
