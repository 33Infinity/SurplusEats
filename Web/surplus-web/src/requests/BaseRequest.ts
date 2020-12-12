import { ErrorModel } from "../models/ErrorModel";
//import Axios from "./API";

export default class BaseRequest {
  async getJson(aUrl) {
    try {
      const response = await fetch(aUrl);
      const json = await response.json();
      return json;
      /* await Axios.Get(aUrl).then((response) => {
        console.log(response);
        if (response != null) {
          return ErrorModel.NewError(response);
        }
        return response;
      }); */
    } catch (exception) {
      return ErrorModel.NewError(exception);
    }
  }
}
