import SqlHelper from "../../utils/SqlHelper";
import VendorTO from "../to/Vendor";
import Clause from "../Clause";
import Operators from "../Operators";

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

  static async getByName(admin, aName) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(VendorTO.ColumnNames.Name, Operators.equals, aName)
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      VendorTO.TableName,
      clauses
    );
    return response;
  }

  static async add(admin, vendor, anEmail) {
    const vendorTO = VendorTO.NewVendor(
      anEmail,
      vendor.Name,
      vendor.ImageUrl,
      vendor.Description,
      null,
      new Date()
    );
    const tuple = vendorTO.getTuple();
    await SqlHelper.insert(admin, VendorTO.TableName, tuple);
    return tuple;
  }
}
