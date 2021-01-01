import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class File extends BaseRequest {
  async saveFile(aFile) {
    const url = Endpoints.saveFile;
    const requestObject = this.buildFileRequestObject(HttpMethods.post, aFile);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
