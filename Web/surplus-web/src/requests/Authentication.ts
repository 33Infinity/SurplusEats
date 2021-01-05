import BaseRequest from "./BaseRequest";
import ProfileModel from "../models/Profile";

export default class Authentication extends BaseRequest {
  async register(aUsername, anEmail, aPassword, aFirstName, aLastName) {
    let url = "";
    let profileModel = ProfileModel.NewNonVendor(
      aUsername,
      anEmail,
      aPassword,
      aFirstName,
      aLastName,
      null,
      null,
      false
    );
    const json = await this.getJson(url, {});
    const result = ProfileModel.fillFromJSON(json as Object);
  }
}
