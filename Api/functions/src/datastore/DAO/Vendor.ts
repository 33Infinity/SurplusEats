import SqlHelper from "../../utils/SqlHelper";
import VendorTO from "../TO/Vendor";

export default class Vendor {
  static async getVendorByLocations(admin, someLocations) {
    const vendorIdArray: string[] = [];
    someLocations.forEach((location) => {
      vendorIdArray.push(location.VendorId);
    });
    const response = await SqlHelper.getByIds(
      admin,
      VendorTO.TableName,
      vendorIdArray
    );
    return response;
  }
}
