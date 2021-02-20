"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_functions = require("firebase-functions");
const inventory_admin = require("firebase-admin");
const inventory_cors = require("cors")({
  origin: true,
});

import HttpHelper from "./utils/HttpHelper";
import InventoryBO from "./bo/Inventory";

exports.add = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await InventoryBO.add(
        inventory_admin,
        data.Name,
        data.Description,
        data.Price,
        data.Quantity,
        data.ImageUrl,
        data.LocationModel.Id
      );
      response.send(resp);
    });
  }
);

exports.delete = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await InventoryBO.delete(inventory_admin, data.InventoryId);
      response.send(resp);
    });
  }
);

exports.getById = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await InventoryBO.getById(inventory_admin, data.InventoryId);
      response.send(HttpHelper.buildResponse(resp));
    });
  }
);

exports.getByLocation = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const inventory = await InventoryBO.getByLocation(
        inventory_admin,
        data.Latitude,
        data.Longitude
      );
      response.send(HttpHelper.buildResponse(inventory));
    });
  }
);

exports.getByVendorLocation = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const retObj = await InventoryBO.getByVendorLocation(
        inventory_admin,
        data.VendorId,
        data.LocationId
      );
      response.send(HttpHelper.buildResponse(retObj));
    });
  }
);

exports.update = inventory_functions.https.onRequest(
  async (request: any, response: any) => {
    return inventory_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const resp = await InventoryBO.update(
        inventory_admin,
        data.Name,
        data.Description,
        data.Price,
        data.Quantity,
        data.ImageUrl,
        data.LocationModel.Id,
        data.Id,
        data.CreatedDate
      );
      response.send(resp);
    });
  }
);
