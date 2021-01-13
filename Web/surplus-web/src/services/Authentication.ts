import ProfileModel from "../models/Profile";
import AuthenticationRequest from "../requests/Authentication";

export default class Authentication {
  async register(aProfileModel): Promise<ProfileModel> {
    const request = new AuthenticationRequest();
    const json = await request.register(aProfileModel);
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
