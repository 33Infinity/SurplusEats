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

  static async getByEmail(admin, anEmail) {
    const clauses: Clause[] = [];
    clauses.push(
      Clause.NewClause(
        VendorTO.ColumnNames.UserEmail,
        Operators.equals,
        anEmail
      )
    );
    const response = await SqlHelper.getWithClauses(
      admin,
      VendorTO.TableName,
      clauses
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
      anEmail.toLowerCase(),
      vendor.Name,
      vendor.ImageUrl,
      vendor.Description,
      vendor.Categories,
      null,
      new Date()
    );
    const tuple = vendorTO.getTuple();
    await SqlHelper.insert(admin, VendorTO.TableName, tuple);
    return tuple;
  }

  static async update(admin, anId, vendor) {
    const response = await SqlHelper.update(
      admin,
      VendorTO.TableName,
      vendor,
      anId
    );
    return response;
  }
}
