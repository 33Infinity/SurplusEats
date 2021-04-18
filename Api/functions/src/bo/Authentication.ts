import ProfileDAO from "../datastore/dao/Profile";
import VendorDAO from "../datastore/dao/Vendor";
import Error from "../Error";
import Constants from "../Constants";

export default class Authentication {
  static async Register(admin, anEmail, aVendor, aProfile, aVendorName) {
    try {
      const profile = await ProfileDAO.getByEmail(admin, anEmail);
      if (profile !== null && profile.length > 0) {
        const error = Error.NewError(
          Constants.Error.PROFILE_ALREADY_EXISTS,
          "500"
        );
        return error;
      }
      if (aVendorName != null) {
        const vendor = await VendorDAO.getByName(admin, aVendorName);
        if (vendor !== null && vendor.length > 0) {
          const error = Error.NewError(
            Constants.Error.VENDOR_ALREADY_EXISTS,
            "500"
          );
          return error;
        }
        await VendorDAO.add(admin, aVendor, anEmail);
      }
      const response = await ProfileDAO.add(admin, aProfile);
      return response;
    } catch (exception) {
      const error = Error.NewError(Constants.Error.UNKNOWN_SERVER_ERROR, "500");
      return error;
    }
  }

  static async signIn(admin, anEmail, aPassword) {
    const profile = await ProfileDAO.getByUserNamePassword(
      admin,
      anEmail,
      aPassword
    );
    if (profile === null && profile.length === 0) {
      const error = Error.NewError(Constants.Error.INVALID_CREDENTIALS, "500");
      return error;
    }
    profile.IsAuthenticated = true;
    return profile;
  }

  static async getProfile(admin, anEmail) {
    const profile = await ProfileDAO.getByEmail(admin, anEmail);
    if (profile === null && profile.length === 0) {
      const error = Error.NewError(Constants.Error.INVALID_CREDENTIALS, "500");
      return error;
    }
    return profile;
  }
}
