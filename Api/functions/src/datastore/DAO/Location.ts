import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import LocationTO from "../TO/Location";

export default class Location {
  static async getLocationsByVendor(admin, aVendorId) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(LocationTO.VendorId, Operators.equals, aVendorId)
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      LocationTO.TableName,
      clauses
    );
    return response;
  }
}
