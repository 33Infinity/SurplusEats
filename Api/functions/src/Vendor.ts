"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendor_functions = require("firebase-functions");
const vendor_admin = require("firebase-admin");
const vendor_cors = require("cors")({
  origin: true,
});

import HttpHelper from "./utils/HttpHelper";
import VendorBO from "./bo/Vendor";

exports.getByEmail = vendor_functions.https.onRequest(
  async (request: any, response: any) => {
    return vendor_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const vendor = await VendorBO.getByEmail(vendor_admin, data.Email);
      response.send(HttpHelper.buildResponse(vendor));
    });
  }
);

exports.update = vendor_functions.https.onRequest(
  async (request: any, response: any) => {
    return vendor_cors(request, response, async () => {
      const data = JSON.parse(request.body);
      const vendor = await VendorBO.update(
        vendor_admin,
        data.UserEmail,
        data.Name,
        data.ImageUrl,
        data.Description,
        data.Id,
        data.CreatedDate
      );
      response.send(vendor);
    });
  }
);
