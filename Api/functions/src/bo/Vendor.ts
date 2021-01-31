import VendorDAO from "../datastore/dao/Vendor";
import VendorTO from "../datastore/to/Vendor";
import Error from "../Error";
import Constants from "../Constants";

export default class Vendor {
  static async getByEmail(admin, anEmail) {
    const vendor = await VendorDAO.getByEmail(admin, anEmail);
    if (vendor == null || vendor.length == 0) {
      const error = Error.NewError(
        Constants.Error.VENDOR_DOES_NOT_EXIST,
        "500"
      );
      return error;
    }
    return vendor;
  }

  static async update(
    admin,
    aUserEmail,
    aName,
    aImageUrl,
    aDescription,
    anId,
    aCreatedDate
  ) {
    const vendorTO = VendorTO.NewVendor(
      aUserEmail,
      aName,
      aImageUrl,
      aDescription,
      anId,
      aCreatedDate
    );
    const response = await VendorDAO.update(admin, anId, vendorTO.getTuple());
    return response;
  }
}
