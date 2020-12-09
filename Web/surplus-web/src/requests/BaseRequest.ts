import { ErrorModel } from "../Models/ErrorModel";
import Axios from "./API";

export default class BaseRequest {
  async getJson(aUrl) {
    try {
      //const test = "https://www.google.com/";
      await Axios.Get(aUrl).then((response) => {
        console.log(response);
        if (response != null) {
          return ErrorModel.NewError(response);
        }
        return response;
      });
    } catch (exception) {
      return ErrorModel.NewError(exception);
    }
  }
}
