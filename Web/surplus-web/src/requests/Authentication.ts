import BaseRequest from "./BaseRequest";
import ProfileModel from "../../../../Models/ProfileModel";
import BaseModel from "../../../../Models/BaseModel";

export default class Authentication extends BaseRequest {
    async register(aUsername, anEmail, aPassword, aFirstName, aLastName){
        let url = "";
        let profileModel = ProfileModel.NewNonVendor(aUsername, anEmail, aPassword, aFirstName, aLastName);
        const json = await this.getJson(url, profileModel);
        const result = ProfileModel.fillFromJSON(json as Object);
    }
}