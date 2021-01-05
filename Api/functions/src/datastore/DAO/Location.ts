import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import LocationTO from "../TO/Location";

export default class Location {
  static async getLocationsByVendor(admin, aVendorId) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(
        LocationTO.ColumnNames.VendorId,
        Operators.equals,
        aVendorId
      )
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      LocationTO.TableName,
      clauses
    );
    return response;
  }

  static async addLocation(admin, location) {
    const locationTO = LocationTO.NewLocation(
      location.VendorModel.Id,
      location.Name,
      location.Latitude,
      location.Longitude,
      location.Address,
      location.PostalCode,
      null,
      new Date()
    );
    const response = await SqlHelper.insert(
      admin,
      LocationTO.TableName,
      locationTO.getTuple()
    );
    return response;
  }
}
