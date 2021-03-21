import VendorDAO from "../datastore/dao/Vendor";
import VendorTO from "../datastore/to/Vendor";
import VendorCategoryDAO from "../datastore/dao/VendorCategory";
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
    someCategories,
    anId,
    aCreatedDate
  ) {
    const categories = await this.getCategories(admin, someCategories);
    const vendorTO = VendorTO.NewVendor(
      aUserEmail,
      aName,
      aImageUrl,
      aDescription,
      categories,
      anId,
      aCreatedDate
    );
    const response = await VendorDAO.update(admin, anId, vendorTO.getTuple());
    if (response) {
      return vendorTO;
    }
    return null;
  }

  private static async getCategories(admin, someCategories) {
    const categorNames = someCategories.map(
      (eachCategory) => eachCategory.Name
    );
    const response = await VendorCategoryDAO.getByNames(admin, categorNames);
    return response;
  }
}
