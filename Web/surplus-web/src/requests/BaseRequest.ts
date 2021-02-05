import Error from "../models/Error";

export default class BaseRequest {
  static async getJson(aUrl, aRequesObject) {
    try {
      const response = await fetch(aUrl, aRequesObject);
      const json = await response.json();
      return json;
    } catch (exception) {
      return Error.NewError(exception);
    }
  }

  static buildRequestObject(anHttpMethod, someData) {
    return {
      method: anHttpMethod,
      body: JSON.stringify(someData),
    };
  }

  static buildFileRequestObject(anHttpMethod, aFile) {
    const formData = new FormData();
    formData.append("myFile", aFile);
    return {
      method: anHttpMethod,
      body: formData,
    };
  }
}
