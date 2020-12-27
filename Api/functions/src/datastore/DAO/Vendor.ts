import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import VendorTO from "../TO/Vendor";

export default class Vendor {
  static async getVendorById(admin, aVendorId) {
    const clauses: Clause[] = [];
    clauses.push(Clause.NewClause(VendorTO.Id, Operators.equals, aVendorId));
    const response = await SqlHelper.getWithClauses(
      admin,
      VendorTO.TableName,
      clauses
    );
    return response;
  }

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
