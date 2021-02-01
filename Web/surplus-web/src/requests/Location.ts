import BaseRequest from "./BaseRequest";
import Endpoints from "./Endpoints";
import HttpMethods from "./HttpMethods";

export default class Location extends BaseRequest {
  async getByLatLon(aLat, aLon) {
    const url = Endpoints.Location.getByLatLon;
    const data = {
      Latitude: aLat,
      Longitude: aLon,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async getByVendor(anEmail) {
    const url = Endpoints.Location.getByVendor;
    const data = {
      Email: anEmail,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async getLatLonFromLocation(aLocationModel) {
    const url = `https://nominatim.openstreetmap.org/search?q=${aLocationModel.Address},+${aLocationModel.City}+${aLocationModel.State}+${aLocationModel.PostalCode}&format=json&polygon=1&addressdetails=1`.replaceAll(
      " ",
      "+"
    );
    const json = await this.getJson(url, null);
    return json;
  }

  async add(aLocationModel) {
    let url = Endpoints.Location.add;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aLocationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async update(aLocationModel) {
    let url = Endpoints.Location.update;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aLocationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async delete(aLocationId) {
    let url = Endpoints.Location.delete;
    const data = {
      LocationId: aLocationId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
