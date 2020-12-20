import { ErrorModel } from "../models/ErrorModel";
//import Axios from "./API";

export default class BaseRequest {
  async getJson(aUrl, aRequesObject) {
    try {
      const response = await fetch(aUrl, aRequesObject);
      const json = await response.json();
      return json;
    } catch (exception) {
      return ErrorModel.NewError(exception);
    }
  }

  buildRequestObject(anHttpMethod, someData) {
    return {
      method: anHttpMethod,
      body: JSON.stringify(someData),
    };
  }
}
