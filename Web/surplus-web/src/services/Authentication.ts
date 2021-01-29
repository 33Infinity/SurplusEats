import ProfileModel from "../models/Profile";
import AuthenticationRequest from "../requests/Authentication";
import Error from "../models/Error";
import BaseService from "./BaseService";

export default class Authentication extends BaseService {
  async register(aProfileModel, aVendorModel): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.register(aProfileModel, aVendorModel);
    if (this.isApiError(json)) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  async signIn(anEmail, aPassword): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.signIn(anEmail, aPassword);
    if (this.isApiError(json)) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  async getProfile(anEmail): Promise<ProfileModel | Error> {
    const request = new AuthenticationRequest();
    const json = await request.getProfile(anEmail);
    if (this.isApiError(json)) {
      return Error.NewError(json.ErrorMessage);
    }
    return this.buildProfileModel(json);
  }

  buildProfileModel(someJson) {
    return ProfileModel.NewProfile(
      someJson.Email,
      someJson.Password,
      someJson.FirstName,
      someJson.LastName,
      someJson.IsVendor,
      someJson.Id,
      someJson.CreatedDate,
      someJson.IsAuthenticated
    );
  }
}
