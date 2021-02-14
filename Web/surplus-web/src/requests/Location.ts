import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Location extends BaseRequest {
  static async getById(anId) {
    const url = Endpoints.Location.getById;
    const data = {
      Id: anId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getByLatLon(aLat, aLon) {
    const url = Endpoints.Location.getByLatLon;
    const data = {
      Latitude: aLat,
      Longitude: aLon,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getByVendor(anEmail) {
    const url = Endpoints.Location.getByVendor;
    const data = {
      Email: anEmail,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async getLatLonFromLocation(aLocationModel) {
    const url = `https://nominatim.openstreetmap.org/search?q=${aLocationModel.Address},+${aLocationModel.City}+${aLocationModel.State}+${aLocationModel.PostalCode}&format=json&polygon=1&addressdetails=1`.replaceAll(
      " ",
      "+"
    );
    const json = await this.getJson(url, null);
    return json;
  }

  static async add(aLocationModel) {
    let url = Endpoints.Location.add;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aLocationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async update(aLocationModel) {
    let url = Endpoints.Location.update;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aLocationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  static async delete(aLocationId) {
    let url = Endpoints.Location.delete;
    const data = {
      LocationId: aLocationId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
