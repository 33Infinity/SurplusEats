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

  async getByVendor(aVendorId) {
    const url = Endpoints.Location.getByVendor;
    const data = {
      VendorId: aVendorId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async addLocation(aLocationModel) {
    let url = Endpoints.Location.addLocation;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aLocationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async updateLocation(aLocationModel) {
    let url = Endpoints.Location.updateLocation;
    const requestObject = this.buildRequestObject(
      HttpMethods.post,
      aLocationModel
    );
    const json = await this.getJson(url, requestObject);
    return json;
  }

  async deleteLocation(aLocationId) {
    let url = Endpoints.Location.deleteLocation;
    const data = {
      LocationId: aLocationId,
    };
    const requestObject = this.buildRequestObject(HttpMethods.post, data);
    const json = await this.getJson(url, requestObject);
    return json;
  }
}
