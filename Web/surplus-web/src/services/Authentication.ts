import ProfileModel from "../models/Profile";
import AuthenticationRequest from "../requests/Authentication";
import Error from "../models/Error";
import BaseService from "./BaseService";

export default class Authentication extends BaseService {
  static async register(
    aProfileModel,
    aVendorModel
  ): Promise<ProfileModel | Error> {
    const json = await AuthenticationRequest.register(
      aProfileModel,
      aVendorModel
    );
    if (this.isApiError(json)) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  static async signIn(anEmail, aPassword): Promise<ProfileModel | Error> {
    const json = await AuthenticationRequest.signIn(anEmail, aPassword);
    if (this.isApiError(json)) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  static async getProfile(anEmail): Promise<ProfileModel | Error> {
    const json = await AuthenticationRequest.getProfile(anEmail);
    if (this.isApiError(json)) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  static buildProfileModel(someJson) {
    return ProfileModel.NewProfile(
      someJson.Email,
      someJson.Password,
      someJson.FirstName,
      someJson.LastName,
      someJson.IsVendor,
      someJson.Id,
      someJson.CreatedDate,
      someJson.IsAuthenticated,
      someJson.InventoryIds,
      someJson.CreditCardNumber,
      someJson.CreditCardMonth,
      someJson.CreditCardYear,
      someJson.CreditCardName
    );
  }
}
