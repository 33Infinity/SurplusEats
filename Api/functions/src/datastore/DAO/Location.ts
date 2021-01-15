import Clause from "../Clause";
import Operators from "../Operators";
import SqlHelper from "../../utils/SqlHelper";
import LocationTO from "../to/Location";

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

  static async add(admin, location) {
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

  static async update(admin, anId, location) {
    const response = await SqlHelper.update(
      admin,
      LocationTO.TableName,
      location,
      anId
    );
    return response;
  }

  static async delete(admin, aLocationId) {
    const response = await SqlHelper.delete(
      admin,
      LocationTO.TableName,
      aLocationId
    );
    return response;
  }

  static Normalize(someJson) {
    const locations = someJson.Locations;
    const vendors = someJson.Vendors;
    return locations.map((locationItem) => {
      const vendor = vendors.find(
        (eachVendor) => eachVendor.Id === locationItem.VendorId
      );
      locationItem.Vendor = vendor;
      return locationItem;
    });
  }
}
