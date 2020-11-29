import BaseModel from "./BaseModel";

export default class ProfileModel extends BaseModel{
    UserName:string;
    FirstName:string;
    LastName:string;
    Vendor:boolean;
    static fromJSON(d: Object): ProfileModel {
        return Object.assign(new ProfileModel(), d);
    }
}